import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";

const useGetUserListing = (listingId) => {
  const handleGetListing = async () => {
    const { data } = await axiosInstance({
      url: `/listings/${listingId}`,
    });

    return data?.data;
  };

  const getListing = useQuery({
    queryKey: [`/listings/${listingId}`],
    queryFn: handleGetListing,
  });

  return getListing;
};

export default useGetUserListing;
