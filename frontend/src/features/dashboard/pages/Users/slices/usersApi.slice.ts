import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps, userInterface} from "@props/";




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
                        { type: 'Users', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Users', id }))
                    ]
                } else return [{ type: 'Users', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: data => ({
                url: '/users',
                method: 'POST',
                body: data 
            }),
            invalidatesTags: [
                { type: 'Users', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: data => ({
                url: '/users',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Users', id: arg.id }
            ]
        }),
        checkDuplicateUser: builder.mutation({
            query: userInfo => ({
                url: '/users/check-duplicate',
                method: 'POST',
                body:userInfo,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Users', id: arg.id }
            ]
        }),
        userUpload:builder.mutation<any, any>({
            query:data=>({
                url:'users/uploads/avatar',
                method:'POST',
                body:data,
            }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Users', id: arg.id }
                ]
        }),
        userRemoveFile:builder.mutation<any, any>({
            query:data =>({
                url:'/users/remove-uploads',
                method:'POST',
                body:data,
            }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Users', id: arg.id }
                ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Users', id: arg.id }
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
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select('Users')

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