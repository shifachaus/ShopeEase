import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Updated import path

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["AuthUser", "Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        if (user.avatar) {
          formData.append("avatar", user.avatar);
        }

        return {
          url: "register",
          method: "POST",

          body: formData,
        };
      },
      invalidatesTags: [{ type: "AuthUser", id: "LIST" }],
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
      invalidatesTags: [{ type: "AuthUser", id: "LIST" }],
    }),

    getUser: builder.query({
      query: () => {
        return `me`;
      },
      providesTags: [{ type: "AuthUser", id: "LIST" }],
    }),

    getAllUser: builder.query({
      query: () => `admin/users`,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),

    getSingleUser: builder.query({
      query: (id) => `/admin/user/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id: String(id) }],
    }),

    updateUser: builder.mutation({
      query: (user) => {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("avatar", user.avatar);

        return {
          url: "me/update",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "AuthUser", id: "LIST" }],
    }),

    updateUserRole: builder.mutation({
      query: (user) => {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("role", user.role);

        return {
          url: `/admin/user/${user.id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    editPassword: builder.mutation({
      query: (user) => {
        const formData = new FormData();
        formData.append("oldPassword", user.oldPassword);
        formData.append("newPassword", user.newPassword);
        formData.append("confirmPassword", user.confirmPassword);

        return {
          url: "password/update",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "AuthUser", id: "LIST" }],
    }),

    forgotPassword: builder.mutation({
      query: (user) => {
        const formData = new FormData();
        formData.append("email", user.email);

        return {
          url: "password/forgot",
          method: "POST",
          body: formData,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (user) => {
        const formData = new FormData();
        formData.append("password", user.password);
        formData.append("confirmPassword", user.confirmPassword);

        return {
          url: `/password/reset/${user.token}`,
          method: "PUT",
          body: formData,
        };
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "AuthUser", id: "LIST" }],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Users", id: "LIST" },
        { type: "Users", id: String(id) },
      ],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyGetUserQuery,
  useGetUserQuery,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useEditPasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useUpdateUserRoleMutation,
} = userApi;
