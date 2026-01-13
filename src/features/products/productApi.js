import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products", "Reviews"],

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    newProduct: builder.mutation({
      query: (product) => {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);

        if (product.originalPrice)
          formData.append("originalPrice", product.originalPrice);

        formData.append("category", product.category);
        formData.append("Stock", product.stock);

        if (product.tags) {
          formData.append("tags[isFeatured]", product.tags.isFeatured);
          formData.append("tags[isBestSeller]", product.tags.isBestSeller);
          formData.append("tags[isSale]", product.tags.isSale);
        }

        product.images.forEach((image) => {
          formData.append("images", image);
        });

        return {
          url: "product/new",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
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

        return `/products?${queryString}`;
      },
      providesTags: [{ type: "Products", id: "LIST" }],
    }),

    getAllFeaturedProducts: builder.query({
      query: (queryObj = {}) => {
        const queryParams = {};

        const { category } = queryObj;

        // Only include category if it's not "all"
        if (category && category.toLowerCase() !== "all") {
          queryParams.category = category;
        }

        const queryString = new URLSearchParams(queryParams).toString();
        return `/products?${queryString}`;
      },
      providesTags: [{ type: "Products", id: "LIST" }],
    }),

    getAdminProducts: builder.query({
      query: () => "/admin/products",
      providesTags: [{ type: "Products", id: "LIST" }],
    }),

    getProduct: builder.query({
      query: (id) => `product/${id}`,
      providesTags: (result, error, id) => [
        { type: "Products", id: String(id) },
      ],
    }),

    updateProduct: builder.mutation({
      query: (product) => {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("Stock", product.stock);

        if (product.originalPrice) {
          formData.append("originalPrice", product.originalPrice);
        }

        if (product.tags) {
          formData.append("tags[isFeatured]", product.tags.isFeatured);
          formData.append("tags[isBestSeller]", product.tags.isBestSeller);
        }

        product.images.forEach((image) => {
          formData.append("images", image);
        });

        return {
          url: `product/${product.id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, product) => [
        { type: "Products", id: "LIST" },
        { type: "Products", id: String(product.id) },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Products", id: "LIST" },
        { type: "Products", id: String(id) },
      ],
    }),

    // REVIEW
    newReview: builder.mutation({
      query: (review) => {
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
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id: String(id) },
        { type: "Reviews", id: String(id) },
      ],
    }),

    getAllProductsReviews: builder.query({
      query: (id) => `reviews?id=${id}`,
      providesTags: (result, error, id) => [
        { type: "Reviews", id: String(id) },
      ],
    }),

    deleteProductReview: builder.mutation({
      query: (review) => {
        return {
          url: `reviews?id=${review.id}&productId=${review.productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: "Products", id: String(productId) },
        { type: "Reviews", id: String(productId) },
      ],
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
  useDeleteProductReviewMutation,
  useGetAllProductsReviewsQuery,
  useLazyGetAllProductsReviewsQuery,
} = productsApi;
