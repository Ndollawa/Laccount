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
            ],
                        // Optimistic update: directly add the new user before server response
                        async onQueryStarted(user, { dispatch, queryFulfilled }) {
                            const patchResult = dispatch(
                                usersApiSlice.util.updateQueryData('getUsers', 'Users', draft => {
                                    usersAdapter.addOne(draft, user);
                                })
                            );
                            try {
                                await queryFulfilled;
                            } catch {
                                patchResult.undo();
                            }
                        },
        }),
        updateUser: builder.mutation({
            query: data => ({
                url: '/users',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Users', id: arg.id }
            ],
                        // Optimistic update: directly update the user in cache
                        async onQueryStarted({ id, ...user }, { dispatch, queryFulfilled }) {
                            const patchResult = dispatch(
                                usersApiSlice.util.updateQueryData('getUsers', 'Users', draft => {
                                    usersAdapter.updateOne(draft, { id, changes: user });
                                })
                            );
                            try {
                                await queryFulfilled;
                            } catch {
                                patchResult.undo();
                            }
                        },
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
            ],
                        // Optimistic update: remove the user before server response
                        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                            const patchResult = dispatch(
                                usersApiSlice.util.updateQueryData('getUsers', 'Users', draft => {
                                    usersAdapter.removeOne(draft, id);
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