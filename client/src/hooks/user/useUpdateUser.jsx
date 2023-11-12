import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const useUpdateUser = () => {
  const { currentUser } = useSelector((state) => state.user);

  const handleUpdateUserDetails = async (userData) => {
    const res = await axios({
      method: "POST",
      headers: { Authorization: `Bearer ${currentUser?.accessToken}` },
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/users/update`,
      data: {
        avatar: userData?.imageURL,
        password: userData?.password,
        email: userData?.email,
      },
    });

    return res;
  };

  const updateUser = useMutation({
    mutationFn: async (userData) => await handleUpdateUserDetails(userData),
    onSuccess: (data) => console.log(data),
  });

  return updateUser;
};

export default useUpdateUser;
