import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps, Cart, CartItem } from "@props/";
import { setCart } from "./cart.slice";

// Create an entity adapter for cart
const cartAdapter = createEntityAdapter({
  selectId: (instance) => instance.id || instance.id, // Custom ID field selector (id or id)
});

// Initial state with the adapter
const initialState = cartAdapter.getInitialState();

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query:  (userId) => ({
        url: `/cart/${userId}`,
        validateStatus: (response:any, result:any) => {
        return response.status === 200 && !result.isError
    },
}),
transformResponse: ({data}:Response) => {
    const loadedCart = data?.map((cart:any) => {
        return cart
    });
    return cartAdapter.setAll(initialState, loadedCart)
},
providesTags: (result, error, arg) => {
    if (result?.ids) {
        return [
            { type: 'Carts', id: 'LIST' },
            ...result.ids.map((id:string) => ({ type: 'Carts', id }))
        ]
    } else return [{ type: 'Carts', id: 'LIST' }]
}
    }),
    addCart: builder.mutation<CartItem, {userId:string; newItem: Partial<CartItem>}>({
      query: ({userId, newItem}) => ({
        url: `/cart/${userId}`,
        method: 'POST',
        body: newItem,
      }),
      invalidatesTags: [
        { type: 'Carts', id: "LIST" }
    ]
    }),
    updateCart: builder.mutation<void, {userId:string; updatedItem:Partial<CartItem>}>({
      query: ({userId, updatedItem}) => ({
        url: `/cart/${userId}`,
        method: 'PUT',
        body: updatedItem,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Carts', id: arg.id }
    ],
    }),
    removeCart: builder.mutation<void, {userId:string; listingId:string }>({
      query: ({userId,listingId}) => ({
        url: `/cart/${userId}/${listingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Carts', id: arg.id }
    ],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: '/cart/clear',
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Carts', id: arg.id }
    ],
    }),
  }),
});

// Export hooks for usage in function components
export const {
  useGetCartQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useRemoveCartMutation,
  useClearCartMutation,
} = cartApiSlice;

// Select the result of the getCart query
export const selectcartResult = cartApiSlice.endpoints.getCart.select('Carts');

// Create memoized selector for cart data
const selectCartData = createSelector(
  selectCartResult,
  (cartResult) => cartResult?.data ?? initialState // Return normalized state or initialState
);

// Use adapter selectors with the normalized state
export const {
  selectAll: selectAllCart,
  selectById: selectcartById,
  selectIds: selectcartIds,
} = cartAdapter.getSelectors((state: any) => selectCartData(state) ?? initialState);