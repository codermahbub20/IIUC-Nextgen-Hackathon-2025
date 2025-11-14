import { baseApi } from "../../api/baseApi";

const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => ({
                url: `/jobs`,
                method: "GET",
            }),
        }),
        getJob: builder.query({
            query: (jobId: string) => ({
                url: `jobs/${jobId}`,
                method: "GET",
            }),
        }),
        // Create a new job
        createJob: builder.mutation({
            query: (body) => ({
                url: `/jobs`,
                method: "POST",
                body,
            }),
        }),
        // Update an existing job
        updateJob: builder.mutation({
            query: ({ jobId, body}) => ({
                url: `/jobs/${jobId}`,
                method: "PATCH",
                body
            }),
        }),
        // Delete a job
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: "DELETE",
            }), 
        }),
    }),
});

export const {
    useGetAllJobsQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
    useGetJobQuery,
} = jobsApi;