import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";

const useDeleteListing = () => {
  const { refetch } = useQuery({ queryKey: ["getUserListings"] });

  const handleDeleteListing = async (listingId) => {
    const { data } = await axiosInstance({
      method: "DELETE",
      url: "/listings/delete",
      data: { id: listingId },
    });

    return data?.data;
  };

  const deleteListingMutation = useMutation({
    mutationFn: handleDeleteListing,
    onSuccess: refetch(),
  });

  return deleteListingMutation;
};

export default useDeleteListing;
