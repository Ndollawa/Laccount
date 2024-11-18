import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";

// Create an entity adapter for categories
const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState();

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET: Fetch all categories
        getCategories: builder.query<any, any>({
            query: () => ({
                url: '/categories',
                validateStatus: (response: any, result: any) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: ({ data }: ResponseProps) => {
                const loadedCategories = data.map((category: any) => category);
                return categoriesAdapter.setAll(initialState, loadedCategories);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Categories', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'Categories', id })),
                    ];
                } else {
                    return [{ type: 'Categories', id: 'LIST' }];
                }
            }
        }),

        // POST: Add new category (optimistic update)
        addNewCategory: builder.mutation({
            query: category => {
                const formData = new FormData();
                formData.append("name", category.name);
                if (category.icon) formData.append("icon", category.icon);
                if (category.iconType) formData.append("iconType", category.iconType);
                formData.append("for", category.for);
                formData.append("status", category.status);
                if (category.parentId) formData.append("parentId", category.parentId);

                return {
                    url: '/categories',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
            // Optimistic update: directly add the new category before server response
            async onQueryStarted(category, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    categoriesApiSlice.util.updateQueryData('getCategories', 'Categories', draft => {
                        categoriesAdapter.addOne(draft, category);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        // PATCH: Update a category (optimistic update)
        updateCategory: builder.mutation({
            query: ({ id, ...category }) => {
                const formData = new FormData();
                formData.append("name", category.name);
                if (category.icon) formData.append("icon", category.icon);
                if (category.iconType) formData.append("iconType", category.iconType);
                formData.append("for", category.for);
                formData.append("status", category.status);
                if (category.parentId) formData.append("parentId", category.parentId);

                return {
                    url: `/categories/${id}`,
                    method: 'PATCH',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Categories', id: arg.id },
            ],
            // Optimistic update: directly update the category in cache
            async onQueryStarted({ id, ...category }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    categoriesApiSlice.util.updateQueryData('getCategories', 'Categories', draft => {
                        categoriesAdapter.updateOne(draft, { id, changes: category });
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        // DELETE: Remove a category (optimistic update)
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Categories', id: arg.id },
            ],
            // Optimistic update: remove the category before server response
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    categoriesApiSlice.util.updateQueryData('getCategories', 'Categories', draft => {
                        categoriesAdapter.removeOne(draft, id);
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
    useGetCategoriesQuery,
    useAddNewCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApiSlice;

// Returns the query result object
export const selectCategoriesResult = categoriesApiSlice.endpoints.getCategories.select('Categories');

// Creates a memoized selector
const selectCategoriesData = createSelector(
    selectCategoriesResult,
    categoriesResult => categoriesResult.data ?? initialState
);

// Create selectors using the entity adapter
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state: RootState) => selectCategoriesData(state));
