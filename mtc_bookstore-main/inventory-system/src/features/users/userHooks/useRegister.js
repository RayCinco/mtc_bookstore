import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../../services/laravelApis";
import toast from "react-hot-toast";

export function useRegister() {
  const queryClient = useQueryClient();

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("User registered successfully");
        queryClient.invalidateQueries({ queryKey: ["staff_users"] });
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (err) => {
      console.error("Registration error:", err);
      toast.error(err.message || "Failed to register user");
    },
  });

  return { register, isRegistering };
}
