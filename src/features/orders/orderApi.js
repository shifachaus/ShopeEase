import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Updated import path

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (order) => {
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

    allOrders: builder.query({
      query: () => "admin/orders",
    }),

    deleteOrder: builder.mutation({
      query: (order) => {
        return {
          url: `admin/order/${order}`,
          method: "DELETE",
        };
      },
    }),

    updateOrder: builder.mutation({
      query: (order) => {
        const formData = new FormData();
        formData.append("status", order?.status);

        return {
          url: `admin/order/${order.id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useNewOrderMutation,
  useMyOrdersQuery,
  useGetOrderDetailsQuery,
  useAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
