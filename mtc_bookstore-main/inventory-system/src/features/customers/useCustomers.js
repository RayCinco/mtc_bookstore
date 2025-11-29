import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/apiUsers";
export function useCustomers() {
  const { isLoading, data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return { isLoadingCustomers: isLoading, customers };
}
