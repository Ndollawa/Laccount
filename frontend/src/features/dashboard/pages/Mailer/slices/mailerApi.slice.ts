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

        getMailTemplates: builder.query<any, any>({
            query: () => ({
                url: '/mailers/mail-templates',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:ResponseProps) => {
                const loadedMailers = data.map((mailTemplates:any) => {
                                    return mailTemplates
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
        addNewMailTemplate: builder.mutation({
            query: mailer => ({
                url: '/mailers/mail-templates',
                method: 'POST',
                body: mailer
            }),
            invalidatesTags: [
                { type: 'Mailers', id: "LIST" }
            ]
        }),
        updateMailTemplate: builder.mutation({
            query:( {id, ...mailTemplate}) => ({
                url: `/mailers/mail-templates/${id}`,
                method: 'PATCH',
                body: mailTemplate,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Mailers', id: arg.id }
            ]
        }),
        deleteMailTemplate: builder.mutation({
            query: ({ id }) => ({
                url: `/mailers/mail-templates/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Mailers', id: arg.id }
            ]
        }),

        getEMailTemplates: builder.query<any, any>({
            query: () => ({
                url: '/mailers/email-templates',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:ResponseProps) => {
                const loadedMailers = data.map((emailTemplates:any) => {
                                    return emailTemplates
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
        addNewEMailTemplate: builder.mutation({
            query: emailTemplate => ({
                url: '/mailers/email-templates',
                method: 'POST',
                body: emailTemplate
            }),
            invalidatesTags: [
                { type: 'Mailers', id: "LIST" }
            ]
        }),
        updateEMailTemplate: builder.mutation({
            query: ({id, ...emailTemplate}) => ({
                url: `/mailers/email-templates/${id}`,
                method: 'PATCH',
                body: emailTemplate,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Mailers', id: arg.id }
            ]
        }),
        deleteEMailTemplate: builder.mutation({
            query: ({ id }) => ({
                url: `/mailers/email-templates/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Mailers', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetEMailTemplatesQuery,
    useAddNewEMailTemplateMutation,
    useUpdateEMailTemplateMutation,
    useDeleteEMailTemplateMutation,
    useGetMailTemplatesQuery,
    useAddNewMailTemplateMutation,
    useUpdateMailTemplateMutation,
    useDeleteMailTemplateMutation,
} = mailersApiSlice

// returns the query result object
export const selectMailTemplatesResult = mailersApiSlice.endpoints.getMailTemplates.select("Mailers")
export const selectEMailTemplatesResult = mailersApiSlice.endpoints.getEMailTemplates.select("Mailers")

// creates memoized selector
const selectMailTemplatesData = createSelector(
    selectMailTemplatesResult,
    mailTemplatesResult => mailTemplatesResult.data // normalized state object with ids & entities
)
const selectEMailTemplatesData = createSelector(
    selectEMailTemplatesResult,
    EmailTemplatesResult => EmailTemplatesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMailTemplates,
    selectById: selectMailTemplateById,
    selectIds: selectMailTemplateIds
    // Pass in a selector that returns the notes slice of state
} = mailersAdapter.getSelectors((state:RootState) => selectMailTemplatesData(state) ?? initialState)
export const {
    selectAll: selectAllEMailTemplates,
    selectById: selectEMailTemplateById,
    selectIds: selectEMailTemplateIds
    // Pass in a selector that returns the notes slice of state
} = mailersAdapter.getSelectors((state:RootState) => selectEMailTemplatesData(state) ?? initialState)