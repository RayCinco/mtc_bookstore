import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../../services/apiOrders";
import { useParams } from "react-router-dom";

export function useOrder() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
    retry: false,
  });

  return {
    isLoading,
    order: data?.order || {},
    items: data?.items || [],
    error,
  };
}
