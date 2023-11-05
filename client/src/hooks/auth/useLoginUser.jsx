import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useLoginUser = () => {
  //   const queryClient = useQueryClient();

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
  });

  return loginUserMutation;
};

export default useLoginUser;
