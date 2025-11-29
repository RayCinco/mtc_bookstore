import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateProduct } from "../../../services/apiProducts";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const {
    mutate: createProduct,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: (product) => createUpdateProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return { createProduct, isCreating, error };
}
