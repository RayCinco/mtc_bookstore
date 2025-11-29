import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAvatar } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const {
    mutate: updateAvatar,
    mutateAsync: updateAvatarAsync,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: (avatarFile) => updateUserAvatar(avatarFile),
    onSuccess: (data) => {
      toast.success("Avatar updated successfully");

      // Update user in localStorage
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.avatar = data.avatar;
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Invalidate user queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update avatar");
    },
  });

  return { updateAvatar, isUpdating, error };
}

export default useUpdateAvatar;
