import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../../services/apiOrders";
export function useOrders() {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    retry: false,
  });

  return { isLoading, orders, error };
}
