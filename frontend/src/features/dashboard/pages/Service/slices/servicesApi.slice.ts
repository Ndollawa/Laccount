import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
// import ServiceProps from "@utils/props/ServiceProps";
// interface servicesProp extends  ServiceProps{}


const servicesAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = servicesAdapter.getInitialState()

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<any, any>({
      query: () => ({
        url: "/services",
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: ({ data }: ResponseProps) => {
        const loadedServices = data.map((service: any) => {
          return service;
        });
        return servicesAdapter.setAll(initialState, loadedServices);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Services", id: "LIST" },
            ...result.ids.map((id: string) => ({ type: "Services", id })),
          ];
        } else return [{ type: "Services", id: "LIST" }];
      },
    }),
    addNewService: builder.mutation({
      query: (service) => {
        const formData = new FormData();
        formData.append("title", service.title);
        formData.append("icon", service.icon);
        formData.append("description", service.description);
        formData.append("body", service.body);
        formData.append("status", service.status);
        formData.append("tags", service.tags);
        if (service.image) formData.append("file", service.image);

        return {
          url: "/services",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Services", id: "LIST" }],
      // Optimistic update: directly add the new service before server response
      async onQueryStarted(service, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          servicesApiSlice.util.updateQueryData(
            "getServices",
            "Services",
            (draft) => {
              servicesAdapter.addOne(draft, service);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateService: builder.mutation({
      query: ({ id, image, ...service }) => {
        const formData = new FormData();
        formData.append("title", service.title);
        formData.append("icon", service.icon);
        formData.append("description", service.description);
        formData.append("body", service.body);
        formData.append("status", service.status);
        formData.append("tags", service.tags);
        if (image) formData.append("file", image);
        return {
          url: `/services/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Services", id: arg.id },
      ],
      // Optimistic update: directly update the service in cache
      async onQueryStarted({ id, ...service }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          servicesApiSlice.util.updateQueryData(
            "getServices",
            "Services",
            (draft) => {
              servicesAdapter.updateOne(draft, { id, changes: service });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteService: builder.mutation({
      query: ({ id }) => ({
        url: `/services/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Services", id: arg.id },
      ],
            // Optimistic update: remove the service before server response
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    servicesApiSlice.util.updateQueryData('getServices', 'Services', draft => {
                        servicesAdapter.removeOne(draft, id);
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
    useGetServicesQuery,
    useAddNewServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = servicesApiSlice

// returns the query result object
export const selectServicesResult = servicesApiSlice.endpoints.getServices.select("Services")

// creates memoized selector
const selectServicesData = createSelector(
    selectServicesResult,
    servicesResult => servicesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllServices,
    selectById: selectServiceById,
    selectIds: selectServiceIds
    // Pass in a selector that returns the notes slice of state
} = servicesAdapter.getSelectors((state:RootState) => selectServicesData(state) ?? initialState)