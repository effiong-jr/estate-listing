import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const useUpdateListing = () => {
  const navigate = useNavigate();

  const handleUpdateListing = async (newListing) =>
    await axiosInstance({
      method: "PUT",
      url: `/listings/update/${newListing._id}`,
      data: newListing,
    });

  const mutateUpdateListing = useMutation({
    mutationFn: handleUpdateListing,
    onSuccess: () => {
      navigate(`/listings`);
    },
  });

  return mutateUpdateListing;
};

export default useUpdateListing;
