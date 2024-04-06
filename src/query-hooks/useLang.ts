import { getLangById, patchLang, postLang } from "@/api";
import { DetailContentProps } from "@/pages/private/Langs/Detail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetLangById = (id: string | undefined) => {
    return useQuery({
        queryKey: ['lang', id],
        queryFn: () => getLangById(id),
        enabled: !!id,
    });
}

export const usePostLang = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DetailContentProps) => postLang(data),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['lang'] });
            queryClient.removeQueries({ queryKey: ['dataUrl'] });
        }
    });
}

export const usePatchLang = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DetailContentProps) => patchLang(data),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['lang'] });
            queryClient.removeQueries({ queryKey: ['dataUrl'] });
        }
    });
}