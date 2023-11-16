import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../../redux/features/user";
import axiosInstance from "../../utils/axios";

const useLoginUser = () => {
  const dispatch = useDispatch();

  const loginUser = async (userData) => {
    const res = await axiosInstance({
      url: `/auth/login`,
      method: "POST",
      data: userData,
    });

    return res;
  };

  const loginUserMutation = useMutation({
    mutationFn: async (data) => await loginUser(data),
    onSuccess: (res) => {
      const { data } = res.data;
      dispatch(setCurrentUser(data));
    },
  });

  return loginUserMutation;
};

export default useLoginUser;
