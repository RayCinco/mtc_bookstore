import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRole as updateUserRoleApi } from "../../../services/apiUsers";
import { toast } from "react-hot-toast";

export function useUpdateRole() {
  const queryClient = useQueryClient();

  const { mutate: updateUserRole, isPending: isUpdating } = useMutation({
    mutationFn: ({ userId, role }) => updateUserRoleApi(userId, role),
    onSuccess: () => {
      toast.success("User role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["staff_users"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update user role");
    },
  });

  return { updateUserRole, isUpdating };
}
