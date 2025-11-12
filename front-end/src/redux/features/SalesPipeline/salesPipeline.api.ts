import { baseApi } from "../../api/baseApi";

const salesPipelineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesPipelines: builder.query({
        query: () => ({
            url: '/sales-pipeline',
            method: 'GET',
        }),
    }),
    getSalesPipelineById: builder.query({
        query: (id: string) => ({
            url: `/sales-pipeline/${id}`,  
            method: 'GET',
        }),
    }),
    createSalesPipeline: builder.mutation({
        query: (newPipeline) => ({
            url: '/sales-pipeline',
            method: 'POST',
            body: newPipeline,
        }),
    }),
    updateSalesPipeline: builder.mutation({
        query: ({ id, ...updatedPipeline }) => ({
            url: `/sales-pipeline/${id}`,
            method: 'PATCH',
            body: updatedPipeline,
        }),     
    }), 
    deleteSalesPipeline: builder.mutation({
        query: (id: string) => ({
            url: `/sales-pipeline/${id}`,
            method: 'DELETE',
        }),
    }),
  }),
});
export const {
    useGetSalesPipelinesQuery,  
    useGetSalesPipelineByIdQuery,
    useCreateSalesPipelineMutation,
    useUpdateSalesPipelineMutation,
    useDeleteSalesPipelineMutation,
} = salesPipelineApi;