import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "../../../../../app/stores/store";
import { apiSlice } from "../../../../../app/api/apiSlice";
import userInterface from "../../../../../app/props/userProps";
import { ResponseProps } from "../../../../../app/props/responseProps";




const usersAdapter = createEntityAdapter({
    sortComparer: (a:userInterface, b:userInterface) => (a.createdAt === b.createdAt) ? 0 : a.createdAt ? 1 : -1
})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<any, any>({
            query: () => ({
                url: '/users',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:Response) => {
                const loadedUsers = data?.map((user:any) => {
                  return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: data => ({
                url: '/users',
                method: 'POST',
                body: data 
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: data => ({
                url: '/users',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        checkDuplicateUser: builder.mutation({
            query: userInfo => ({
                url: '/check-duplicate',
                method: 'POST',
                body:userInfo,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        userUpload:builder.mutation<any, any>({
            query:data=>({
                url:'users/uploads/avatar',
                method:'POST',
                body:data,
            }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Setting', id: arg.id }
                ]
        }),
        userRemoveFile:builder.mutation<any, any>({
            query:data =>({
                url:'/users/remove-uploads',
                method:'POST',
                body:data,
            }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Setting', id: arg.id }
                ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useUserUploadMutation,
    useUserRemoveFileMutation,
    useCheckDuplicateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select('User')

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the notes slice of state
} = usersAdapter.getSelectors((state:any) => selectUsersData(state) ?? initialState)