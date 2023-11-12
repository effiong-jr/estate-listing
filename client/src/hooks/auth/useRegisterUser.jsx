import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../../redux/features/user";
const useRegisterUser = () => {
  //   const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const registerUser = async (userData) => {
    const res = await axios(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/users/register`,
      {
        method: "POST",
        data: userData,
      }
    );

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
