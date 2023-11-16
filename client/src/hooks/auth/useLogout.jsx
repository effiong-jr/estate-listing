import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { deleteCurrentUser } from "../../redux/features/user";
import axiosInstance from "../../utils/axios";

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const { data } = await axiosInstance({
      method: "POST",
      url: "/auth/logout",
    });

    return data?.data;
  };

  const logoutMutaion = useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      dispatch(deleteCurrentUser());
    },
  });

  return logoutMutaion;
};

export default useLogout;
