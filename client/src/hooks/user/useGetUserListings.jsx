import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";

const useGetUserListings = () => {
  const getUserListings = async () => {
    const { data } = await axiosInstance({
      url: "/listings",
    });

    return data?.data?.userListings;
  };

  const userListings = useQuery({
    queryKey: ["getUserListings"],
    queryFn: getUserListings,
    enabled: false,
  });

  return userListings;
};

export default useGetUserListings;
