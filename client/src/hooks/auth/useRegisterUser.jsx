import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../../redux/features/user";
import axiosInstance from "../../utils/axios";
const useRegisterUser = () => {
  const dispatch = useDispatch();

  const registerUser = async (userData) => {
    const res = await axiosInstance(`/users/register`, {
      method: "POST",
      data: userData,
    });

    return res;
  };

  const registerUserMutation = useMutation({
    mutationFn: async (data) => await registerUser(data),
    onSuccess: (res) => {
      const { data } = res.data;
      dispatch(setCurrentUser(data));
    },
  });

  return registerUserMutation;
};

export default useRegisterUser;
