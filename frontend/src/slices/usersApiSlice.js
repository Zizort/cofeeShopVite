import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //mutation and method: because post request
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;