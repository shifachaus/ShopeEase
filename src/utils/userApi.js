import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Updated import path

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shopease-backend.onrender.com/api/v1/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("avatar", user.avatar); // Assuming user.avatar is the File object

        return {
          url: "register",
          method: "POST",

          body: formData,
        };
      },
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: user,
      }),
    }),

    getUser: builder.query({
      query: () => {
        return `me`;
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
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

    getAllUser: builder.query({
      query: () => `admin/users`,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/${id}`, // Use a parameter for the URL if needed
        method: "DELETE",
      }),
    }),

    getSingleUser: builder.query({
      query: (user) => `/admin/user/${user}`,
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
