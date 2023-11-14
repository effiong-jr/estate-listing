import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/user";
import axiosInstance from "../../utils/axios";

const useUpdateUser = () => {
  const dispatch = useDispatch();

  const handleUpdateUserDetails = async (userData) => {
    const res = await axiosInstance({
      method: "POST",
      url: `/users/update`,
      data: {
        avatar: userData?.imageURL,
        password: userData?.password,
        email: userData?.email,
      },
    });

    return res;
  };

  const updateUser = useMutation({
    mutationFn: handleUpdateUserDetails,
    onSuccess: (res) => {
      const { data } = res.data;

      dispatch(setCurrentUser(data));
    },
  });

  return updateUser;
};

export default useUpdateUser;
