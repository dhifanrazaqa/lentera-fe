import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchClasss,
  createClass,
  detailClass,
  createContent,
  deleteContent,
  fetchStudentsClass,
  updateStudentStatus,
  deleteStudentClass,
  createMaterial,
  createAssignment,
  fetchSubmissions,
} from "../api/class";

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

export const useFetchStudentsClass = (id) => {
  return useQuery({
    queryKey: ["studentsClass", id],
    queryFn: () => fetchStudentsClass(id),
    enabled: !!id, // Cache data selama 5 menit
  });
};

export const useUpdateStudentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updatedStudent }) => updateStudentStatus(updatedStudent),
    onSuccess: () => {
      queryClient.invalidateQueries(["studentsClass"]); // Refresh data setelah update
    },
  });
};

export const useDeleteStudentClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ student }) => deleteStudentClass(student),
    onSuccess: () => {
      queryClient.invalidateQueries(["studentsClass"]); // Refresh data setelah delete
    },
  });
};

export const useCreateContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContent,
    onSuccess: () => {
      queryClient.invalidateQueries(["contents"]); // Refresh data setelah create
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contentId, id }) => deleteContent({ contentId }, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["contents"]); // Refresh data setelah delete
    },
  });
};

export const useCreateMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries(["materials"]); // Refresh data setelah create
    },
  });
};

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries(["assignments"]); // Refresh data setelah create
    },
  });
};

export const useFetchSubmissions = (classId, assignmentId) => {
  return useQuery({
    queryKey: ["submissions", classId, assignmentId],
    queryFn: () => fetchSubmissions(classId, assignmentId),
    enabled: !!assignmentId, // Cache data selama 5 menit
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
