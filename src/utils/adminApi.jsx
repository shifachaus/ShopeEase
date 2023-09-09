import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "admin/users", // Return the endpoint URL as a string
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/users/${id}`, // Use a parameter for the URL if needed
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useDeleteUserMutation } = adminApi;
