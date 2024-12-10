import { Injectable } from '@nestjs/common';
import { Prisma, Testimonial } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class TestimonialRepository extends PrismaBaseRepository<
  Testimonial,
  | Prisma.TestimonialCreateArgs
  | Prisma.TestimonialCreateManyArgs
  | Prisma.TestimonialCreateInput
  | Prisma.TestimonialCreateManyInput
  | Prisma.TestimonialUncheckedCreateInput,
  | Prisma.TestimonialFindUniqueArgs
  | Prisma.TestimonialFindManyArgs
  | Prisma.TestimonialFindUniqueOrThrowArgs
  | Prisma.TestimonialFindFirstArgs
  | Prisma.TestimonialFindFirstOrThrowArgs
  | Prisma.TestimonialAggregateArgs
  | Prisma.TestimonialGroupByArgs
  | Prisma.TestimonialCountArgs,
  | Prisma.TestimonialUpdateArgs
  | Prisma.TestimonialUpdateManyArgs
  | Prisma.TestimonialUpsertArgs
  | Prisma.TestimonialUncheckedUpdateInput
  | Prisma.TestimonialUncheckedUpdateManyInput,
  Prisma.TestimonialDeleteArgs | Prisma.TestimonialDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.testimonial);
  }

  // Additional methods specific to the Testimonial entity can be added here
}
