import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../../../services/apiCart";

export function useDeleteCartItem() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteItem,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: (cartItemId) => deleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return { deleteItem, isDeleting, error };
}
