import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCartItem } from "../../../services/apiCart";
import { useNavigate } from "react-router";
export function useAddCartItem() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: addItem,
    isPending: isAdding,
    error,
  } = useMutation({
    mutationFn: (cartItem) => createUpdateCartItem(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/cart");
    },
  });
  return { addItem, isAdding, error };
}
