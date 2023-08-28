import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Updated import path

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (order) => {
        console.log(order, "ORDER");
        return {
          url: "order/new",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: order,
        };
      },
    }),

    myOrders: builder.query({
      query: () => "orders/me",
    }),

    getOrderDetails: builder.query({
      query: (id) => `/order/${id}`,
    }),
  }),
});

export const {
  useNewOrderMutation,
  useMyOrdersQuery,
  useGetOrderDetailsQuery,
} = orderApi;
