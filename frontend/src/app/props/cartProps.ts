export interface CartItem {
  id: number;
  listingId: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'failed';
}
