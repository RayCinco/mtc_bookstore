import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../services/apiProducts";

export function useProduct() {
  const { id } = useParams();
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)),
    retry: false,
  });

  return { isLoading, product, error };
}
