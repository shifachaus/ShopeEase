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

    getAdminProducts: builder.query({
      query: () => "/admin/products",
    }),

    newProduct: builder.mutation({
      query: (product) => {
        console.log(product, "product API", product.images);
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("Stock", product.stock);

        product.images.forEach((image) => {
          formData.append("images", image);
        });

        return {
          url: "product/new",
          method: "POST",
          body: formData,
        };
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
    }),

    updateProduct: builder.mutation({
      query: (product) => {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("Stock", product.stock);

        product.images.forEach((image) => {
          formData.append("images", image);
        });

        return {
          url: `product/${product.id}`,
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
  useGetAdminProductsQuery,
  useNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
