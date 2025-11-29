import { logout as logoutApi } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear all queries from cache
      queryClient.removeQueries();
      // Show success message
      toast.success("Logged out successfully");
      // Navigate to login
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to logout");
    },
  });

  return { logout, isLoading };
}
