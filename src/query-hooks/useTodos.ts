import { getTodoById, patchTodo, postTodo } from "@/api";
import { DetailContentProps } from "@/pages/private/Todo/Detail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTodoById = (id: string | undefined) => {
    return useQuery({
        queryKey: ['todo', id],
        queryFn: () => getTodoById(id),
        enabled: !!id,
    });
}

export const usePostTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DetailContentProps) => postTodo(data),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['todo'] });
            queryClient.removeQueries({ queryKey: ['dataUrl'] });
        }
    });
}

export const usePatchTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DetailContentProps) => patchTodo(data),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['todo'] });
            queryClient.removeQueries({ queryKey: ['dataUrl'] });
        }
    });
}