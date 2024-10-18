import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../stores/store";
import { logOut, setCredentials } from "../../features/auth/slices/auth.slice";

// Prepare the headers with token
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500/api/v1/",
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
  tagTypes: ["users","appSettings","posts","comments","accountDetails","vendors","profiles","ratings","payments","transactions","supportTickets","notifiactions",
    "subscriptions","subscriptionPlans","roomMessages","messages","mailer","paymentGateway", "cart", "savedItems"],
  endpoints: (builders) => ({}),
});