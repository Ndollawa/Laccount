import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
// import { contactInterface } from "../../../auth/authSlice";





const contactsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = contactsAdapter.getInitialState()

export const contactsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query<any, any>({
            query: () => ({
                url: '/contacts',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:ResponseProps) => {
                const loadedContacts = data?.map((contact:any) => {
                    return contact
                });
                return contactsAdapter.setAll(initialState, loadedContacts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Contacts', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Contacts', id }))
                    ]
                } else return [{ type: 'Contacts', id: 'LIST' }]
            }
        }),
        addNewContact: builder.mutation({
            query: initialContact => ({
                url: '/contacts',
                method: 'POST',
                body: initialContact
            }),
            invalidatesTags: [
                { type: 'Contacts', id: "LIST" }
            ]
        }),
        updateContact: builder.mutation({
            query: initialContact => ({
                url: '/contacts',
                method: 'PATCH',
                body: initialContact
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Contacts', id: arg.id }
            ]
        }),
      
        deleteContact: builder.mutation({
            query: ({ id }) => ({
                url: `/contacts`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Contacts', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetContactsQuery,
    useAddNewContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
} = contactsApiSlice

// returns the query result object
export const selectContactsResult = contactsApiSlice.endpoints.getContacts.select('Contacts')

// creates memoized selector
const selectContactsData = createSelector(
    selectContactsResult,
    contactsResult => contactsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllContacts,
    selectById: selectContactById,
    selectIds: selectContactIds
    // Pass in a selector that returns the notes slice of state
} = contactsAdapter.getSelectors((state:any) => selectContactsData(state) ?? initialState)