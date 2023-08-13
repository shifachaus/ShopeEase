import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (queryObj) => {
        const { keyword, currentPage, price, category, ratings } = queryObj;
        const queryString = new URLSearchParams({
          keyword,
          // page: currentPage,
          // "price[gte]": price[0],
          // "price[lte]": price[1],
          // category,
          // "ratings[gte]": ratings,
        }).toString();

        return `/products?${queryString}`;
      },
    }),

    getProduct: builder.query({
      query: (product) => `product/${product}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
