import { baseApi } from "../../api/baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
        query: (body) => ({
            url: `/tasks`,
            method: "POST",
            body,
        }),
    }),
    getAllTasks: builder.query({
        query: () => ({
            url: `/tasks`,
            method: "GET",
        }),
    }), 
    getTask: builder.query({
        query: (taskId: string) => ({
            url: `tasks/${taskId}`,
            method: "GET",
        }),
    }), 
    updateTask: builder.mutation({
        query: ({ taskId, body}) => ({
            url: `/tasks/${taskId}`,
            method: "PATCH",
            body
        }), 

    }),

    deleteTask: builder.mutation({
        query: (taskId: string) => ({
            url: `/tasks/${taskId}`,
            method: "DELETE",
        }),
    })
  }),
});
export const {
  useGetAllTasksQuery,
  useUpdateTaskMutation,
  useGetTaskQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;