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
  createQuiz,
  fetchQuizData,
  createAttempt,
  fetchAnsweredData,
  answeringQuestion,
  fetchFinalResult,
  fetchStats,
  statusClass,
  addStudentClass,
  checkSubmission,
} from "../api/class";

export const useFetchClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasss,
    staleTime: 1000 * 60 * 5, // Cache data selama 5 menit
  });
};

export const useFetchStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchDetailClass = (id) => {
  return useQuery({
    queryKey: ["class", id],
    queryFn: () => detailClass(id),
    enabled: !!id, // Cache data selama 5 menit
  });
};

export const useFetchStatusClass = (id) => {
  return useQuery({
    queryKey: ["classStatus", id],
    queryFn: () => statusClass(id),
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

export const useAddStudentClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStudentClass,
    onSuccess: () => {
      queryClient.invalidateQueries(["studentClass"]); // Refresh data setelah create
    },
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

export const useCheckSubmissions = (id) => {
  return useQuery({
    queryKey: ["submissionStatus", id],
    queryFn: () => checkSubmission(id),
    enabled: !!id, // Cache data selama 5 menit
  });
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries(["quizzes"]); // Refresh data setelah create
    },
  });
};

export const useFetchQuizData = (id) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => fetchQuizData(id),
    enabled: !!id, // Cache data selama 5 menit
  });
};

export const useFetchAnweredData = (id) => {
  return useQuery({
    queryKey: ["answeredData", id],
    queryFn: () => fetchAnsweredData(id),
    enabled: !!id, // Cache data selama 5 menit
  });
};

export const useCreateAttempt = () => {
  return useMutation({
    mutationFn: createAttempt,
  });
};

export const useAnsweringQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: answeringQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries(["answeredData"]); // Refresh data setelah create
    },
  });
};

export const useFetchFinalResult = () => {
  return useMutation({
    mutationFn: fetchFinalResult,
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
