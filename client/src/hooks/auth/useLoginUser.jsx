import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../../redux/features/user";

const useLoginUser = () => {
  const dispatch = useDispatch();

  const loginUser = async (userData) => {
    const res = await axios(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/users/login`,
      {
        method: "POST",
        data: userData,
      }
    );

    return res;
  };

  const loginUserMutation = useMutation({
    mutationFn: async (data) => await loginUser(data),
    onSuccess: (res) => {
      const { user } = res.data.data;
      dispatch(setCurrentUser(user));
    },
  });

  return loginUserMutation;
};

export default useLoginUser;
