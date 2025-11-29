import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderDetails as updateOrderDetailsApi } from "../../../services/apiOrders";
import { toast } from "react-hot-toast";

export function useUpdateOrderDetails() {
  const queryClient = useQueryClient();

  const { mutate: updateOrderDetails, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateOrderDetailsApi(id, data),
    onSuccess: () => {
      toast.success("Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update order");
    },
  });

  return { updateOrderDetails, isUpdating };
}
