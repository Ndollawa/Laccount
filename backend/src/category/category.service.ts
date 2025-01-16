import { Injectable, Logger } from '@nestjs/common';
import { Category, PublishStatus } from '@prisma/client';
import { join } from 'path';
import { handleError, deleteItem } from '@app/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(protected readonly categoryRepository: CategoryRepository) {}

  async find(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Category[]> {
    try {
      return await this.categoryRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Category> {
    try {
      const rec = await this.categoryRepository.delete({
        where: { id },
        select: { icon: true },
      });
      return;
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createCategoryData: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<Category> {
    // const { authorId } = createCategoryData;
    const data = !file
      ? createCategoryData
      : { ...createCategoryData, icon: file.filename };
    try {
      // const existingCategory = await this.categoryRepository.exists({
      //   where: { categoryId },
      // });
      // if (existingCategory) {
      //   throw new HttpException(
      //     'Category with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }
      const newCategory = await this.categoryRepository.create({
        data,
      });
      return newCategory;
    } catch (error) {
      handleError(error);
    }
  }

  async update(
    id: string,
    updateCategoryData: UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    const destination = join('../../', 'uploads/categories');
    console.log(updateCategoryData);
    const data = !file
      ? updateCategoryData
      : { ...updateCategoryData, icon: file.filename };

    try {
      const rec = await this.categoryRepository.update({
        where: { id },
        data,
        select: { icon: true, iconType: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateCategoryData: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.upsert({
        where: { id },
        data: updateCategoryData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
