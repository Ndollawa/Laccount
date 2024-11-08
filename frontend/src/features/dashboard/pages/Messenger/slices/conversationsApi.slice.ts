import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "@api/apiSlice";
import { RootState } from "@store/store";
import { ResponseProps } from "@props/responseProps";

const conversationsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = conversationsAdapter.getInitialState()

export const conversationsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getConversations: builder.query<any,any>({
            query: () => ({
                url: '/conversations',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:Response) => {
                const loadedConversations = data?.map((conversation:any) => {
                    return conversation
                });
                return conversationsAdapter.setAll(initialState, loadedConversations)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Conversations', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Conversations', id }))
                    ]
                } else return [{ type: 'Conversations', id: 'LIST' }]
            }
        }),
        addNewConversation: builder.mutation({
            query: initialConversation => ({
                url: '/conversations',
                method: 'POST',
                body: {
                    ...initialConversation,
                }
            }),
            invalidatesTags: [
                { type: 'Conversations', id: "LIST" }
            ]
        }),
        updateConversation: builder.mutation({
            query: initialConversation => ({
                url: '/conversations',
                method: 'PATCH',
                body: {
                    ...initialConversation,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Conversations', id: arg.id }
            ]
        }),
        deleteConversation: builder.mutation({
            query: ({ id }) => ({
                url: `/conversations`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Conversations', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetConversationsQuery,
    useAddNewConversationMutation,
    useUpdateConversationMutation,
    useDeleteConversationMutation,
} = conversationsApiSlice

// returns the query result object
export const selectConversationsResult = conversationsApiSlice.endpoints.getConversations.select('Conversations')

// creates memoized selector
const selectConversationsData = createSelector(
    selectConversationsResult,
    conversationsResult => conversationsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllConversations,
    selectById: selectConversationById,
    selectIds: selectConversationIds
    // Pass in a selector that returns the conversations slice of state
} = conversationsAdapter.getSelectors((state:RootState) => selectConversationsData(state) ?? initialState)