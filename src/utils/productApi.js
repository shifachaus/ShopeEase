import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllFeaturedProducts: builder.query({
      query: () => {
        return `/products`;
      },
    }),
    getAllProducts: builder.query({
      query: (queryObj) => {
        const { keyword, currentPage, price, category, ratings } = queryObj;

        const queryParams = {
          keyword,
          page: currentPage,
          "price[gte]": price[0],
          "price[lte]": price[1],
        };

        if (category && category !== "all") {
          queryParams.category = category;
        }

        if (ratings && ratings !== 0) {
          queryParams.ratings = ratings;
        }

        const queryString = new URLSearchParams(queryParams).toString();
        console.log(queryString, "API", category);

        return `/products?${queryString}`;
      },
    }),

    getProduct: builder.query({
      query: (product) => `product/${product}`,
    }),

    newReview: builder.mutation({
      query: (review) => {
        console.log(review, "review API");
        const formData = new FormData();
        formData.append("productId", review.id);
        formData.append("comment", review.comment);
        formData.append("rating", review.rating);

        return {
          url: "review",
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetAllFeaturedProductsQuery,
  useGetAllProductsQuery,
  useGetProductQuery,
  useNewReviewMutation,
} = productsApi;
