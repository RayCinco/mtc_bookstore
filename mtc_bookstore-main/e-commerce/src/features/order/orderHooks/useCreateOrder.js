import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../../services/apiOrders";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrder,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: (order) => createOrderApi(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return { createOrder, isCreating, error };
}
