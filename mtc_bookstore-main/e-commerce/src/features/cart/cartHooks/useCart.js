import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../../services/apiCart";

export function useCart() {
  const {
    isLoading: isLoadingCart,
    data: { cart_id, cart_items: cart } = {},
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    enabled: true,
    retry: false,
    staleTime: 0, // Always consider data stale for immediate updates
    cacheTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  return { cart_id, isLoadingCart, cart, error };
}
