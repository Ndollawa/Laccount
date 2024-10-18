import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cart, CartItem } from '@prisma/client';
import { handleError } from '@app/common';
import { CartRepository, CartItemRepository } from './repositories/';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';

@Injectable()
export class CartService {
  constructor(
    protected readonly cartRepository: CartRepository,
    protected readonly cartItemRepository: CartItemRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async getCart(userId: string) {
    return this.cartRepository.find({
      where: { userId },
      include: { items: true },
    });
  }

  async addItemToCart(userId: string, createCartItemDto: CreateCartItemDto) {
    let cart = await this.cartRepository.find({ where: { userId } });

    if (!cart) {
      cart = await this.cartRepository.create({
        data: {
          userId,
          items: {
            create: {
              listingId: createCartItemDto.listingId,
              quantity: createCartItemDto.quantity,
            },
          },
        },
      });
    } else {
      const existingItem = await this.cartItemRepository.findFirst({
        where: { cartId: cart.id, listingId: createCartItemDto.listingId },
      });

      if (existingItem) {
        await this.cartItemRepository.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + createCartItemDto.quantity,
          },
        });
      } else {
        await this.cartItemRepository.create({
          data: {
            cartId: cart.id,
            listingId: createCartItemDto.listingId,
            quantity: createCartItemDto.quantity,
          },
        });
      }
    }

    return this.getCart(userId);
  }

  async updateCartItem(userId: string, updateCartItemDto: UpdateCartItemDto) {
    const cart = await this.cartRepository.find({ where: { userId } });

    if (cart) {
      await this.cartItemRepository.updateMany({
        where: { cartId: cart.id, listingId: updateCartItemDto.listingId },
        data: { quantity: updateCartItemDto.quantity },
      });

      return this.getCart(userId);
    }

    throw new Error('Cart not found');
  }

  async removeItemFromCart(userId: string, listingId: string) {
    const cart = await this.cartRepository.find({ where: { userId } });

    if (cart) {
      await this.cartItemRepository.deleteMany({
        where: { cartId: cart.id, listingId },
      });
      return this.getCart(userId);
    }

    throw new Error('Cart not found');
  }

  async clearCart(userId: string) {
    const cart = await this.cartRepository.find({ where: { userId } });

    if (cart) {
      await this.cartItemRepository.deleteMany({ where: { cartId: cart.id } });
      return this.getCart(userId);
    }

    throw new Error('Cart not found');
  }
}
