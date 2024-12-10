import { Injectable, Logger } from '@nestjs/common';
import { Category, PublishStatus } from '@prisma/client';
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
        select:{icon:true}
      });
      return 
    } catch (error) {
      handleError(error);
    }
  }
  async create(createCategoryData: CreateCategoryDto): Promise<Category> {
    // const { authorId } = createCategoryData;

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
      const categoryData = {
        ...createCategoryData,
      };
      const newCategory = await this.categoryRepository.create({
        data: categoryData,
      });
      return newCategory;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, updateCategoryData: UpdateCategoryDto) {
    try {
      const rec = await this.categoryRepository.update({
        where: { id },
        data: updateCategoryData,
        select:{icon:true}
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
