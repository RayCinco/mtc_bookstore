import { useQuery } from "@tanstack/react-query";
import { getStaffUsers } from "../../../services/apiUsers";

export function useStaffUsers() {
  const {
    isLoading: isLoadingStaff,
    data: staffUsers,
    error,
  } = useQuery({
    queryKey: ["staff_users"],
    queryFn: getStaffUsers,
  });

  return { isLoadingStaff, staffUsers, error };
}
