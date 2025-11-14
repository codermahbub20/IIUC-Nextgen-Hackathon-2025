import { baseApi } from "../../api/baseApi";

const resourcesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllResources: builder.query({    
            query: () => ({
                url: `/learning-resources`,
                method: "GET",
            }),
        }),
        getResource: builder.query({
            query: (resourceId: string) => ({
                url: `/learning-resources/${resourceId}`,
                method: "GET",
            }), 
        }),
        // Create a new resource
        createResource: builder.mutation({  

            query: (body) => ({
                url: `/learning-resources`,
                method: "POST", 
                body,
            }),
        }),
    }),

})

export const {
    useGetAllResourcesQuery,
    useCreateResourceMutation,
    useGetResourceQuery,
} = resourcesApi;