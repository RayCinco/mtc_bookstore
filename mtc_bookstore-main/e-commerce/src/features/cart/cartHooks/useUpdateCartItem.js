import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCartItem } from "../../../services/apiCart";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const {
    mutate: updateItem,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (cartItem) => createUpdateCartItem(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return { updateItem, isUpdating, error };
}
