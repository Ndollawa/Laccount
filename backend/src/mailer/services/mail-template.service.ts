import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { join, resolve } from 'path';
import * as fs from 'fs-extra';
import * as grpc from '@grpc/grpc-js';
import { MailTemplate } from '@prisma/client';
import { handleError } from '@app/common';
import { MailTemplateRepository } from '../repositories/mail-template.repository';
import { CreateMailTemplateDto, UpdateMailTemplateDto } from '../dto';

const { ALREADY_EXISTS } = grpc.status;

@Injectable()
export class MailTemplateService {
  private readonly templatePath: string;
  constructor(
    protected readonly mailTemplateRepository: MailTemplateRepository,
  ) {
    // Resolve the path relative to the current working directory (root of the project)
    this.templatePath = resolve(process.cwd(), 'src', 'mailer', 'templates');
    Logger.debug(`Resolved template path: ${this.templatePath}`);
    Logger.debug(
      `Resolved template __dir path: ${resolve(__dirname, 'src', 'mailer', 'templates')}`,
    );
  }

  // Find a single template by query
  async find(query: any): Promise<MailTemplate> {
    try {
      return await this.mailTemplateRepository.find(query);
    } catch (error) {
      handleError(error);
    }
  }

  // Find all templates by query
  async findAll(query: any): Promise<MailTemplate[]> {
    try {
      return await this.mailTemplateRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  // Create a new mail template
  async create(
    createMailTemplateDto: CreateMailTemplateDto,
  ): Promise<MailTemplate> {
    const { name } = createMailTemplateDto;
    try {
      const existingTemplate = await this.mailTemplateRepository.exists({
        where: { name },
      });

      if (existingTemplate) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'Mail template with name already exists.',
        });
      }
      Logger.debug(this.templatePath);
      Logger.debug(__dirname);
      await this.saveTemplate(createMailTemplateDto); // Save template content

      const newTemplate = await this.mailTemplateRepository.create({
        data: createMailTemplateDto,
      });

      return newTemplate;
    } catch (error) {
      handleError(error);
    }
  }

  // Update an existing mail template
  async update(id: string, data: UpdateMailTemplateDto) {
    try {
      return await this.mailTemplateRepository.update({
        where: { id },
        data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  // Upsert mail template
  async upsert(id: string, data: UpdateMailTemplateDto) {
    try {
      return await this.mailTemplateRepository.upsert({
        where: { id },
        data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  // Remove a mail template by ID
  async remove(id: string): Promise<MailTemplate> {
    try {
      return await this.mailTemplateRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // Save a new email template to the filesystem
  private async saveTemplate(createMailTemplateDto: CreateMailTemplateDto) {
    const { name, template } = createMailTemplateDto;
    const templateFile = this.getTemplatePath(name);

    // Ensure the template directory exists or create it
    await fs.ensureDir(this.templatePath);

    // Save the template content to the specified file
    await fs.writeFile(templateFile, template, 'utf-8');
  }

  // Retrieve a list of available templates
  async getTemplates(): Promise<string[]> {
    // Ensure the template directory exists
    await fs.ensureDir(this.templatePath);

    return fs.readdir(this.templatePath);
  }

  // Retrieve a template by its name
  async getTemplate(name: string): Promise<string> {
    const templateFile = this.getTemplatePath(name);

    // Check if the template exists before reading
    if (await this.templateExists(name)) {
      return fs.readFile(templateFile, 'utf-8');
    }

    throw new BadRequestException('Template not found');
  }

  // Check if a template exists
  private async templateExists(name: string): Promise<boolean> {
    const templateFile = this.getTemplatePath(name);
    return fs.pathExists(templateFile);
  }

  // Utility to get the full path of a template file
  private getTemplatePath(name: string): string {
    return join(this.templatePath, `${name}.hbs`);
  }
}
