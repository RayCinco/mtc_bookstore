import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../../services/apiContact";

export function useMessages() {
  const {
    isLoading,
    data: messages,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(),
    retry: false,
  });

  return { isLoading, messages, error };
}
