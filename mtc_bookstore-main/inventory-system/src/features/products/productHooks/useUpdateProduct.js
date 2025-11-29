import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateProduct } from "../../../services/apiProducts";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const {
    mutate: updateProduct,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (product) => createUpdateProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return { updateProduct, isUpdating, error };
}
