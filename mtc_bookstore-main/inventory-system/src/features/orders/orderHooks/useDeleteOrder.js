import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder as deleteOrderApi } from "../../../services/apiOrders";

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteOrder,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => deleteOrderApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  return { deleteOrder, isDeleting, error };
}
