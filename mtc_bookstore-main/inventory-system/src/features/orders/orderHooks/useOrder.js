import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../../services/apiOrders";
export function useOrder(id) {
  const { isLoading: isLoadingOrder, data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });

  return { isLoadingOrder, order };
}
