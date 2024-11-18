import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "@store/store";
import { logOut, setCredentials } from "@auth/slices/auth.slice";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Prepare the headers with token
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args:any, api:any, extraOptions:any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    //request to get a new token
    const refreshResult: any = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // stores a new token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data = "Access Forbidden";
      } else if (refreshResult?.error?.status === 401 && refreshResult?.error?.data?.message === "no token") {
        refreshResult.error.data = "Your login session has expired";
        api.dispatch(logOut());
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users","AppSettings","Posts","Comments","AccountDetails","Vendors","Profiles","Ratings","Payments","Transactions","SupportTickets","Notifiactions",
    "Subscriptions","SubscriptionPlans","RoomMessages","Messages","Mailers","PaymentGateways", "Carts", "SavedItems","Categories"],
  endpoints: (builders) => ({}),
});