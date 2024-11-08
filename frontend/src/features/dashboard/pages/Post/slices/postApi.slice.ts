import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
// import PostProps from "@utils/props/PostProps";
// interface postsProp extends  PostProps{}


const postsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = postsAdapter.getInitialState()

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<any, any>({
            query: () => ({
                url: '/posts',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:ResponseProps) => {
                const loadedPosts = data.map((post:any) => {
                    return post
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Posts', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Posts', id }))
                    ]
                } else return [{ type: 'Posts', id: 'LIST' }]
            }
        }),
        addNewPost: builder.mutation({
            query: post => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: [
                { type: 'Posts', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: post => ({
                url: '/posts',
                method: 'PATCH',
                body: post,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Posts', id: arg.id }
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Posts', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPostsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postsApiSlice

// returns the query result object
export const selectPostsResult = postsApiSlice.endpoints.getPosts.select("Posts")

// creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the notes slice of state
} = postsAdapter.getSelectors((state:any) => selectPostsData(state) ?? initialState)