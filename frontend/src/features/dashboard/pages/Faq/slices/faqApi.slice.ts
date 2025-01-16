import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { FaqProps } from "@props/FaqProps";



interface faqsProps extends FaqProps{}


const faqsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = faqsAdapter.getInitialState()

export const faqsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFaqs: builder.query<any, any>({
            query: () => ({
                url: '/faqs',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:Response) => {
                const loadedFaqs = data?.map((faq:any) => {
                    return faq
                });
                return faqsAdapter.setAll(initialState, loadedFaqs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Faqs', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Faqs', id }))
                    ]
                } else return [{ type: 'Faqs', id: 'LIST' }]
            }
        }),
        addNewFaq: builder.mutation({
            query: initialFaq => ({
                url: '/faqs',
                method: 'POST',
                body: initialFaq,
            }),
            invalidatesTags: [
                { type: 'Faqs', id: "LIST" }
            ],
             // Optimistic update: directly add the new faq before server response
            async onQueryStarted(faq, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    faqsApiSlice.util.updateQueryData('getFaqs', 'Faqs', draft => {
                        faqsAdapter.addOne(draft, faq);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        updateFaq: builder.mutation({
            query: ({id, ...initialFaq}) => ({
                url: `/faqs/${ id }`,
                method: 'PATCH',
                body:initialFaq,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Faqs', id: arg.id }
            ],
            // Optimistic update: directly update the faq in cache
            async onQueryStarted({ id, ...faq }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    faqsApiSlice.util.updateQueryData('getFaqs', 'Faqs', draft => {
                        faqsAdapter.updateOne(draft, { id, changes: faq });
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        deleteFaq: builder.mutation({
            query: ({ id }) => ({
                url: `/faqs/${ id }`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Faqs', id: arg.id }
            ],
            // Optimistic update: remove the faq before server response
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    faqsApiSlice.util.updateQueryData('getFaqs', 'Faqs', draft => {
                        faqsAdapter.removeOne(draft, id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
})

export const {
    useGetFaqsQuery,
    useAddNewFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
} = faqsApiSlice

// returns the query result object
export const selectFaqsResult = faqsApiSlice.endpoints.getFaqs.select('Faqs')

// creates memoized selector
const selectFaqsData = createSelector(
    selectFaqsResult,
    faqsResult => faqsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllFaqs,
    selectById: selectFaqById,
    selectIds: selectFaqIds
    // Pass in a selector that returns the notes slice of state
} = faqsAdapter.getSelectors((state:RootState) => selectFaqsData(state) ?? initialState)