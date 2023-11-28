import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const useCreateListing = () => {
  const navigate = useNavigate();

  const handleCreateListing = async (newListing) =>
    await axiosInstance({
      method: "POST",
      url: "/listings/create",
      data: newListing,
      withCredentials: true,
    });

  const mutateCreateListing = useMutation({
    mutationFn: handleCreateListing,
    onSuccess: () => {
      navigate(`/listings`);
    },
  });

  return mutateCreateListing;
};

export default useCreateListing;
