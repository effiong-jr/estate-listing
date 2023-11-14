import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { deleteCurrentUser } from "../../redux/features/user";
import axiosInstance from "../../utils/axios";

const useDeleteAccount = () => {
  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    const { data } = await axiosInstance({
      method: "DELETE",
      url: `users/delete`,
    });

    return data;
  };

  const deleteUser = useMutation({
    mutationFn: handleDeleteAccount,
    onSuccess: () => {
      dispatch(deleteCurrentUser());
    },
  });

  return deleteUser;
};

export default useDeleteAccount;
