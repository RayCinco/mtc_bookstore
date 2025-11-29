import { useQuery } from "@tanstack/react-query";
import { getImageUrl } from "../services/apiImages";

/**
 * Hook to fetch image URL from Laravel storage using TanStack Query
 * @param {string} imagePath - The storage path of the image
 * @returns {Object} - { data: url, isLoading, error, isError }
 *
 * Usage:
 * const { data: url, isLoading, error } = useImage(product.image);
 * return <img src={url || "/img/product-1.jpg"} />;
 */
export function useImage(imagePath) {
  return useQuery({
    queryKey: ["image", imagePath],
    queryFn: () => getImageUrl(imagePath),
    enabled: !!imagePath,
    staleTime: Infinity, // Image URLs don't change, cache forever
    retry: 1,
    onError: (error) => {
      console.error("useImage: Failed to fetch image URL", error);
    },
  });
}

export default useImage;
