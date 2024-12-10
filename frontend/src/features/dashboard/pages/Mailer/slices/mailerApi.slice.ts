import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
// import MailerProps from "@utils/props/MailerProps";
// interface mailersProp extends  MailerProps{}


const mailersAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = mailersAdapter.getInitialState()

export const mailersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMailers: builder.query<any, any>({
            query: () => ({
                url: '/mailers',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:ResponseProps) => {
                const loadedMailers = data.map((mailer:any) => {
                                    return mailer
                });
                return mailersAdapter.setAll(initialState, loadedMailers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Mailers', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Mailers', id }))
                    ]
                } else return [{ type: 'Mailers', id: 'LIST' }]
            }
        }),
        addNewMailer: builder.mutation({
            query: mailer => ({
                url: '/mailers',
                method: 'POST',
                body: mailer
            }),
            invalidatesTags: [
                { type: 'Mailers', id: "LIST" }
            ]
        }),
        updateMailer: builder.mutation({
            query: mailer => ({
                url: '/mailers',
                method: 'PATCH',
                body: mailer,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Mailers', id: arg.id }
            ]
        }),
        deleteMailer: builder.mutation({
            query: ({ id }) => ({
                url: `/mailers`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Mailers', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetMailersQuery,
    useAddNewMailerMutation,
    useUpdateMailerMutation,
    useDeleteMailerMutation,
} = mailersApiSlice

// returns the query result object
export const selectMailersResult = mailersApiSlice.endpoints.getMailers.select("Mailers")

// creates memoized selector
const selectMailersData = createSelector(
    selectMailersResult,
    mailersResult => mailersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMailers,
    selectById: selectMailerById,
    selectIds: selectMailerIds
    // Pass in a selector that returns the notes slice of state
} = mailersAdapter.getSelectors((state:any) => selectMailersData(state) ?? initialState)