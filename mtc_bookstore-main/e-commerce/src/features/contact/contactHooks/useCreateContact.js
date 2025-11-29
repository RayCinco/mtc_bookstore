import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../../../services/apiContact";
import toast from "react-hot-toast";

/**
 * Hook to create a contact message
 * Usage:
 * const { createContact, isLoading } = useCreateContact();
 * createContact({ name, email, subject, message })
 */
export function useCreateContact() {
  const queryClient = useQueryClient();

  const {
    mutate: createContact,
    isLoading: isContacting,
    error,
  } = useMutation({
    mutationFn: (payload) => createMessage(payload),
    onSuccess: (data) => {
      toast.success("Message sent successfully");
      // Invalidate messages list if present (admin view)
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (err) => {
      const msg =
        err?.message ||
        (err?.error && JSON.stringify(err.error)) ||
        "Failed to send message";
      toast.error(msg);
    },
  });

  return { createContact, isContacting, error };
}

export default useCreateContact;
