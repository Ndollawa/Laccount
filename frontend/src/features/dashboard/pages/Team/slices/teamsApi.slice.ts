import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
// import TeamProps from "@utils/props/TeamProps";
// interface teamsProp extends  TeamProps{}


const teamsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = teamsAdapter.getInitialState()

export const teamsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTeams: builder.query<any, any>({
            query: () => ({
                url: '/teams',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: ({data}:ResponseProps) => {
                const loadedTeams = data.map((team:any) => {
                                    return team
                });
                return teamsAdapter.setAll(initialState, loadedTeams)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Teams', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Teams', id }))
                    ]
                } else return [{ type: 'Teams', id: 'LIST' }]
            }
        }),
        addNewTeam: builder.mutation({
            query: team =>{
                const formData = new FormData();
                formData.append('firstName', team.firstName);
                formData.append('lastName', team.lastName);
                formData.append('email', team.email);
                formData.append('position', team.position);
                formData.append('contact', team.contact);
                formData.append('bio', team.bio);
                formData.append('status', team.status);
                formData.append('socialMedia', JSON.stringify(team.socialMedia));
                if (team.image ) formData.append("file", team.image);
                return({
                url: '/teams',
                method: 'POST',
                body: formData,
            })
        },
              
            invalidatesTags: [
                { type: 'Teams', id: "LIST" }
            ],
            // Optimistic update: directly add the new team before server response
            async onQueryStarted(team, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    teamsApiSlice.util.updateQueryData('getTeams', 'Teams', draft => {
                        teamsAdapter.addOne(draft, team);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        updateTeam: builder.mutation({
            query: ({id, image, ...team}) => {
                const formData = new FormData();
                formData.append('id', id);
                formData.append('firstName', team.firstName);
                formData.append('lastName', team.lastName);
                formData.append('email', team.email);
                formData.append('position', team.position);
                formData.append('contact', team.contact);
                formData.append('bio', team.bio);
                formData.append('status', team.status);
                formData.append('socialMedia', JSON.stringify(team.socialMedia));
                if (image) formData.append('file', image);
            
                return ({
                url: `/teams/${id}`,
                method: 'PATCH',
                body: JSON.stringify(formData),
                formData: true,
               })},
            invalidatesTags: (result, error, arg) => [
                { type: 'Teams', id: arg.id }
            ],
            // Optimistic update: directly update the team in cache
            async onQueryStarted({ id, ...team }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    teamsApiSlice.util.updateQueryData('getTeams', 'Teams', draft => {
                        teamsAdapter.updateOne(draft, { id, changes: team });
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
        deleteTeam: builder.mutation({
            query: ({ id }) => ({
                url: `/teams/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Teams', id: arg.id }
            ],
            // Optimistic update: remove the team before server response
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    teamsApiSlice.util.updateQueryData('getTeams', 'Teams', draft => {
                        teamsAdapter.removeOne(draft, id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
})

export const {
    useGetTeamsQuery,
    useAddNewTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
} = teamsApiSlice

// returns the query result object
export const selectTeamsResult = teamsApiSlice.endpoints.getTeams.select("Teams")

// creates memoized selector
const selectTeamsData = createSelector(
    selectTeamsResult,
    teamsResult => teamsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTeams,
    selectById: selectTeamById,
    selectIds: selectTeamIds
    // Pass in a selector that returns the notes slice of state
} = teamsAdapter.getSelectors((state:RootState) => selectTeamsData(state) ?? initialState)