import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useRegisterUser = () => {
  //   const queryClient = useQueryClient();

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
  });

  return registerUserMutation;
};

export default useRegisterUser;
