import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("Login successful!");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Provided email or password are incorrect");
    },
  });

  return { login, isLogin };
}
