import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({        
            query: () => ({
                url: `/users`,
                method: "GET",
            }),
        }),
        getUser: builder.query({    
            query: (userId: string) => ({
                url: `users/${userId}`,             
                method: "GET",
            }),
        }),
        // Create a new user    
        createUser: builder.mutation({
            query: (body) => ({
                url: `/users`,
                method: "POST",
                body,
            }),
        }),
        // Update an existing user
        updateUser: builder.mutation({      
            query: ({ userId, body}) => ({
                url: `/users/${userId}`,
                method: "PATCH",
                body
            }),
        }),
        // Delete a user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
        }), 
    }), 
});
export const {
    useGetAllUsersQuery,
    useCreateUserMutation,  
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserQuery,
} = userApi;