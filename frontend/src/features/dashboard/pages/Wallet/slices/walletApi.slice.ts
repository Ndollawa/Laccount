import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
// import { walletInterface } from "../../../auth/authSlice";





const walletAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = walletAdapter.getInitialState()

export const walletApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getwallet: builder.query<any, any>({
            query: () => ({
                url: '/wallet',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:ResponseProps) => {
                const loadedwallet = data?.map((wallet:any) => {
                    return wallet
                });
                return walletAdapter.setAll(initialState, loadedwallet)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Wallet', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Wallet', id }))
                    ]
                } else return [{ type: 'Wallet', id: 'LIST' }]
            }
        }),
         // Wallet Top-up API
    walletTopUp: builder.mutation({
        query: (topUpData) => ({
          url: '/wallet/topup',
          method: 'POST',
          body: topUpData,
        }),
        //  invalidatesTags: (result, error, arg) => [
        //         { type: 'Wallet', id: arg.id }
        //     ]
      }),
      // Fund Transfer API
      transferFunds: builder.mutation({
        query: (transferData) => ({
          url: '/wallet/transfer',
          method: 'POST',
          body: transferData,
        }),  
        //  invalidatesTags: (result, error, arg) => [
        //         { type: 'Wallet', id: arg.id }
        //     ]
      }),
        addNewwallet: builder.mutation({
            query: initialwallet => ({
                url: '/wallet',
                method: 'POST',
                body: initialwallet
            }),
            invalidatesTags: [
                { type: 'Wallet', id: "LIST" }
            ]
        }),
        updatewallet: builder.mutation({
            query: initialwallet => ({
                url: '/wallet',
                method: 'PATCH',
                body: initialwallet
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Wallet', id: arg.id }
            ]
        }),
      
        deletewallet: builder.mutation({
            query: ({ id }) => ({
                url: `/wallet`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Wallet', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetwalletQuery,
    useAddNewwalletMutation,
    useUpdatewalletMutation,
    useWalletTopUpMutation,
    useTransferFundsMutation,
    useDeletewalletMutation,
} = walletApiSlice

// returns the query result object
export const selectwalletResult = walletApiSlice.endpoints.getwallet.select('wallet')

// creates memoized selector
const selectwalletData = createSelector(
    selectwalletResult,
    walletResult => walletResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllwallet,
    selectById: selectwalletById,
    selectIds: selectwalletIds
    // Pass in a selector that returns the notes slice of state
} = walletAdapter.getSelectors((state:any) => selectwalletData(state) ?? initialState)