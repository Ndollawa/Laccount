import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";

// Create an entity adapter for listings
const listingsAdapter = createEntityAdapter();

const initialState = listingsAdapter.getInitialState();

export const listingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET: Fetch all listings
        getListings: builder.query<any, any>({
            query: () => ({
                url: '/listings',
                validateStatus: (response: any, result: any) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: ({ data }: ResponseProps) => {
                const loadedListings = data.map((listing: any) => listing);
                return listingsAdapter.setAll(initialState, loadedListings);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Listings', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'Listings', id })),
                    ];
                } else {
                    return [{ type: 'Listings', id: 'LIST' }];
                }
            }
        }),

        // POST: Add new listing (optimistic update)
        addNewListing: builder.mutation({
            query: listing => {
                const formData = new FormData();
                formData.append("name", listing.name);
                if (listing.icon) formData.append("icon", listing.icon);
                if (listing.iconType) formData.append("iconType", listing.iconType);
                formData.append("for", listing.for);
                formData.append("status", listing.status);
                if (listing.parentId) formData.append("parentId", listing.parentId);

                return {
                    url: '/listings',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'Listings', id: 'LIST' }],
            // Optimistic update: directly add the new listing before server response
            async onQueryStarted(listing, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    listingsApiSlice.util.updateQueryData('getListings', 'Listings', draft => {
                        listingsAdapter.addOne(draft, listing);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        // PATCH: Update a listing (optimistic update)
        updateListing: builder.mutation({
            query: ({ id, ...listing }) => {
                const formData = new FormData();
                formData.append("name", listing.name);
                if (listing.icon) formData.append("icon", listing.icon);
                if (listing.iconType) formData.append("iconType", listing.iconType);
                formData.append("for", listing.for);
                formData.append("status", listing.status);
                if (listing.parentId) formData.append("parentId", listing.parentId);

                return {
                    url: `/listings/${id}`,
                    method: 'PATCH',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Listings', id: arg.id },
            ],
            // Optimistic update: directly update the listing in cache
            async onQueryStarted({ id, ...listing }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    listingsApiSlice.util.updateQueryData('getListings', 'Listings', draft => {
                        listingsAdapter.updateOne(draft, { id, changes: listing });
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        // DELETE: Remove a listing (optimistic update)
        deleteListing: builder.mutation({
            query: ({ id }) => ({
                url: `/listings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Listings', id: arg.id },
            ],
            // Optimistic update: remove the listing before server response
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    listingsApiSlice.util.updateQueryData('getListings', 'Listings', draft => {
                        listingsAdapter.removeOne(draft, id);
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
});

export const {
    useGetListingsQuery,
    useAddNewListingMutation,
    useUpdateListingMutation,
    useDeleteListingMutation,
} = listingsApiSlice;

// Returns the query result object
export const selectListingsResult = listingsApiSlice.endpoints.getListings.select('Listings');

// Creates a memoized selector
const selectListingsData = createSelector(
    selectListingsResult,
    listingsResult => listingsResult.data ?? initialState
);

// Create selectors using the entity adapter
export const {
    selectAll: selectAllListings,
    selectById: selectListingById,
    selectIds: selectListingIds,
} = listingsAdapter.getSelectors((state: RootState) => selectListingsData(state));
