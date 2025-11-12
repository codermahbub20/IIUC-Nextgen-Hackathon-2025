import { baseApi } from "../../api/baseApi";

const employeesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => ({
                url: `/employees`,
                method: "GET",
            }),
        }),
        getEmployee: builder.query({
            query: (employeeId: string) => ({
                url: `employees/${employeeId}`,             
                method: "GET",
            }),
        }),
        // Create a new employee
        createEmployee: builder.mutation({
            query: (body) => ({
                url: `/employees`,
                method: "POST",
                body,
            }),
        }),
        // Update an existing employee
        updateEmployee: builder.mutation({
            query: ({ employeeId, body}) => ({
                url: `/employees/${employeeId}`,

                method: "PATCH",
                body
            }),
        }),
        // Delete an employee
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employees/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});
export const {
    useGetAllEmployeesQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetEmployeeQuery,
} = employeesApi;