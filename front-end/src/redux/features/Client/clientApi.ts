
import { baseApi } from "../../api/baseApi";


const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    createClient: builder.mutation({
      query: (body) => ({
        url: `/clients`,  
        method: "POST",
        body,
      }),
    }),

    getAllClients: builder.query({
      query: () => ({
        url: `/clients`,
        method: "GET",
        // Pass userEmail as a query parameter
      }),
    }),

    getClient: builder.query({
      query: (userId: string) => ({
        url: `clients/${userId}`,
        method: "GET",
      }),
    }),

    
    // // Update an existing client
    updateClient: builder.mutation({
  query: ({ userId, body }) => ({
    url: `/clients/${userId}`,
    method: 'PATCH',
    body,
  }),
}),


    deleteClient: builder.mutation({
      query: (userId: string) => ({
        url: `/clients/${userId}`,  
        method: "DELETE",
      }),
    }), 

    
  }),
});

export const {
  useGetAllClientsQuery,
  useUpdateClientMutation,
  useGetClientQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
} = clientApi;

export default clientApi;