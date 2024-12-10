import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
// import { paymentInterface } from "../../../auth/authSlice";





const paymentAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = paymentAdapter.getInitialState()

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       
         // payment Top-up API
    processPayment: builder.mutation({
        query: (paymentData) => ({
          url: '/payments/process-payment',
          method: 'POST',
          body: paymentData,
        }),
        //  invalidatesTags: (result, error, arg) => [
        //         { type: 'payment', id: arg.id }
        //     ]
      }),
     
    }),
})

export const {
    
    useProcessPaymentMutation,
} = paymentApiSlice

// returns the query result object
// export const selectpaymentResult = paymentApiSlice.endpoints.getpayment.select('payments')

// creates memoized selector
// const selectpaymentData = createSelector(
//     selectpaymentResult,
//     paymentResult => paymentResult.data // normalized state object with ids & entities
// )

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllpayment,
//     selectById: selectpaymentById,
//     selectIds: selectpaymentIds
//     // Pass in a selector that returns the notes slice of state
// } = paymentAdapter.getSelectors((state:any) => selectpaymentData(state) ?? initialState)