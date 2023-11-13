import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/user";

const useUpdateUser = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

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
    onSuccess: (res) => {
      const { data } = res.data;

      dispatch(setCurrentUser(data));
    },
  });

  return updateUser;
};

export default useUpdateUser;
