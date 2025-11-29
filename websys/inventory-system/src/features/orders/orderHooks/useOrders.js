import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../services/apiOrders";
export function useOrders() {
  const { isLoading: isLoadingOrders, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return { isLoadingOrders, orders };
}
