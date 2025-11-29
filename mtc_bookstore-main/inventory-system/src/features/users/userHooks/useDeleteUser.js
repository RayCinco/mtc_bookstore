import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../../services/apiUsers";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => deleteUserApi(id),
    onSuccess: () => {
      // Invalidate users and customers lists so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["staff_users"] });
    },
  });

  return { deleteUser, isDeleting, error };
}

export default useDeleteUser;
