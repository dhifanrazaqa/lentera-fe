import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createForum, createReply, fetchForum } from "../api/forum";

export const useFetchForums = (id) => {
  return useQuery({
    queryKey: ["forums", id],
    queryFn: () => fetchForum(id),
    enabled: !!id,
  });
};

export const useCreateForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createForum,
    onSuccess: () => {
      queryClient.invalidateQueries(["forums"]); // Refresh data setelah create
    },
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries(["forums"]); // Refresh data setelah create
    },
  });
};
