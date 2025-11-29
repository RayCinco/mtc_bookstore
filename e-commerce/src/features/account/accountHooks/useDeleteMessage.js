import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "../../../services/apiContact";

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteMessageApi,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (messageId) => deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
  return { deleteMessageApi, isDeleting, error };
}
