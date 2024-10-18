import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartRepository, CartItemRepository } from './repositories/';
import { CartController } from './cart.controller';

@Module({
  controllers: [CartController],
  providers: [CartRepository, CartItemRepository, CartService],
  exports: [CartService],
})
export class CartModule {}
