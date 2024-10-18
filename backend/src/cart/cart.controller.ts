import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post(':userId')
  async addItemToCart(
    @Param('userId') userId: string,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartService.addItemToCart(userId, createCartItemDto);
  }

  @Patch(':userId')
  async updateCartItem(
    @Param('userId') userId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(userId, updateCartItemDto);
  }

  @Delete(':userId/:listingId')
  async removeItemFromCart(
    @Param('userId') userId: string,
    @Param('listingId') listingId: string,
  ) {
    return this.cartService.removeItemFromCart(userId, listingId);
  }

  @Delete(':userId')
  async clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
