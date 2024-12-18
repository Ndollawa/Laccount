import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
// import RoomProps from "@utils/props/RoomProps";
// interface roomsProp extends  RoomProps{}


const roomsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = roomsAdapter.getInitialState()

export const roomsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRooms: builder.query<any, any>({
            query: () => ({
                url: '/rooms',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:ResponseProps) => {
                const loadedRooms = data?.map((room:any) => {
                    return room
                });
                return roomsAdapter.setAll(initialState, loadedRooms)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Room', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Rooms', id }))
                    ]
                } else return [{ type: 'Room', id: 'LIST' }]
            }
        }),
        addNewRoom: builder.mutation({
            query: room => ({
                url: '/rooms',
                method: 'POST',
                body: room
            }),
            invalidatesTags: [
                { type: 'Room', id: "LIST" }
            ]
        }),
        updateRoom: builder.mutation({
            query: room => ({
                url: '/rooms',
                method: 'PATCH',
                body: room,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Room', id: arg.id }
            ]
        }),
        deleteRoom: builder.mutation({
            query: ({ id }) => ({
                url: `/rooms`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Room', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetRoomsQuery,
    useAddNewRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
} = roomsApiSlice

// returns the query result object
export const selectRoomsResult = roomsApiSlice.endpoints.getRooms.select("Rooms")

// creates memoized selector
const selectRoomsData = createSelector(
    selectRoomsResult,
    roomsResult => roomsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllRooms,
    selectById: selectRoomById,
    selectIds: selectRoomIds
    // Pass in a selector that returns the notes slice of state
} = roomsAdapter.getSelectors((state:any) => selectRoomsData(state) ?? initialState)