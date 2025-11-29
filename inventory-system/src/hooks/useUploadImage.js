import { useMutation } from "@tanstack/react-query";
import { uploadImage, deleteImage } from "../services/apiImages";
import toast from "react-hot-toast";

/**
 * Hook for uploading images to Laravel storage
 * @returns {Object} - { upload: function, isUploading: boolean }
 */
export function useUploadImage() {
  const { mutateAsync: upload, isPending: isUploading } = useMutation({
    mutationFn: ({ file, folder }) => uploadImage(file, folder),
    onSuccess: () => {
      toast.success("Image uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload image");
    },
  });

  return { upload, isUploading };
}

/**
 * Hook for deleting images from Laravel storage
 * @returns {Object} - { remove: function, isDeleting: boolean }
 */
export function useDeleteImage() {
  const { mutateAsync: remove, isPending: isDeleting } = useMutation({
    mutationFn: (path) => deleteImage(path),
    onSuccess: () => {
      toast.success("Image deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete image");
    },
  });

  return { remove, isDeleting };
}
