import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "@api/apiSlice";
import { ResponseProps } from "@props/responseProps";
import { Settings } from "@props/settingsProps";
import { setSettings } from "./settings.slice";
import { RootState } from "@store/store";

// Create an entity adapter for settings
const settingsAdapter = createEntityAdapter({
  // selectId: (instance) => instance?.id || instance?.id, // Custom ID field selector (id or id)
});

// Initial state with the adapter
const initialState = settingsAdapter.getInitialState();

export const settingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<any, any>({
      query: () => ({
        url: "app-settings",
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }), 
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data:{entities}={} } = await queryFulfilled;

          const settingState = {
            landingConfig: {},
            dashboardConfig: {},
            companyInfo: {},
          };

          // Process and organize the settings into your custom state structure
         Object.values(entities)?.forEach((setting: Settings<LandingConfig | DashboardConfig | CompanyInfo>) => {
            switch (setting.type) {
              case "DASHBOARD":
                settingState.dashboardConfig = setting;
                break;
              case "LANDING":
                settingState.landingConfig = setting;
                break;
              case "COMPANY_INFO":
                settingState.companyInfo = setting;
                break;
              default:
                // Handle invalid format/type if necessary
                break;
            }
          });

          // Dispatch the custom settings state to the slice
          dispatch(setSettings(settingState));
        } catch (err) {
          console.error("Failed to set settings state:", err);
        }
      },
      transformResponse: ({data}: ResponseProps) => {
        const loadedSettings = data?.map((setting: Settings<LandingConfig | DashboardConfig | CompanyInfo>) => {
          return setting;
        });
        // Use the entity adapter to normalize the response data
        return settingsAdapter.setAll(initialState, loadedSettings);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'AppSettings', id: 'LIST' },
            ...result.ids.map((id: string) => ({ type: 'AppSettings', id })),
          ];
        } else return [{ type: 'AppSettings', id: 'LIST' }];
      },
    }),
    getSettingsByType: builder.query<any, any>({
      query: (type: any) => ({
        url: type ? `/app-settings/type/${type}` : "app-settings",
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),
         providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'AppSettings', id: 'LIST' },
            ...result.ids.map((id: string) => ({ type: 'AppSettings', id })),
          ];
        } else return [{ type: 'AppSettings', id: 'LIST' }];
      },
    }),
    addNewSetting: builder.mutation({
      query: (initialSetting) => ({
        url: `/app-settings/${initialSetting.type}`,
        method: "POST",
        body: {
          ...initialSetting,
        },
      }),
      invalidatesTags: [{ type: 'AppSettings', id: "LIST" }],
    }),
    updateSetting: builder.mutation({
      query: ({ id, ...initialSetting }) => ({
        url: `/app-settings/${id}`,
        method: "PATCH",
        body: {
          ...initialSetting,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'AppSettings', id: arg.id }],
    }),
    updateSlideSetting: builder.mutation({
      query: ( initialSetting ) => ({
        url: `/app-settings/slides`,
        method: "POST",
        body:initialSetting,
        }),
      invalidatesTags: (result, error, arg) => [{ type: 'AppSettings', id: arg.id }],
    }),
    deleteSetting: builder.mutation({
      query: ({ id }) => ({
        url: `/app-settings`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'AppSettings', id: arg.id }],
    }),
    settingsUpload: builder.mutation<any, any>({
      query: (data) => ({
        url: '/app-settings/uploads',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'AppSettings', id: arg.id }],
    }),
    settingsRemoveFile: builder.mutation<any, any>({
      query: (data) => ({
        url: '/app-settings/remove-uploads',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'AppSettings', id: arg.id }],
    }),
  }),
});

// Export hooks for usage in function components
export const {
  useGetSettingsQuery,
  useGetSettingsByTypeQuery,
  useAddNewSettingMutation,
  useUpdateSlideSettingMutation,
  useUpdateSettingMutation,
  useDeleteSettingMutation,
  useSettingsUploadMutation,
  useSettingsRemoveFileMutation,
} = settingsApiSlice;

// Select the result of the getSettings query
export const selectSettingsResult = settingsApiSlice.endpoints.getSettings.select('AppSettings');

// Create memoized selector for settings data
const selectSettingsData = createSelector(
  selectSettingsResult,
  (settingsResult) => settingsResult?.data ?? initialState // Return normalized state or initialState
);

// Use adapter selectors with the normalized state
export const {
  selectAll: selectAllSettings,
  selectById: selectSettingById,
  selectIds: selectSettingIds,
} = settingsAdapter.getSelectors((state: RootState) => selectSettingsData(state) ?? initialState);