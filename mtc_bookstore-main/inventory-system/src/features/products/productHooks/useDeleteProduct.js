import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../services/apiProducts";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const {
    mutate: removeProduct,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return { removeProduct, isDeleting, error };
}
