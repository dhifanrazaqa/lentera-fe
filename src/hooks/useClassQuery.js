import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClasss, createClass, detailClass } from "../api/class";

export const useFetchClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasss,
    staleTime: 1000 * 60 * 5, // Cache data selama 5 menit
  });
};

export const useFetchDetailClass = (id) => {
  return useQuery({
    queryKey: ["class", id],
    queryFn: () => detailClass(id),
    enabled: !!id, // Cache data selama 5 menit
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]); // Refresh data setelah create
    },
  });
};

// export const useUpdateClass = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, updatedClass }) => ClassAPI.update(id, updatedClass),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["classes"]); // Refresh data setelah update
//     },
//   });
// };

// export const useDeleteClass = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ClassAPI.delete,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["classes"]); // Refresh data setelah delete
//     },
//   });
// };
