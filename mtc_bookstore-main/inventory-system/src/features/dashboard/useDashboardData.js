import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../services/apiDashboard";
export function useDashboardData() {
  const { isLoading: isLoadingDashboard, data: dashboardData } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
  });

  return { isLoadingDashboard, dashboardData };
}
