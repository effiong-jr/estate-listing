import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { deleteCurrentUser } from "../../redux/features/user";

const useDeleteAccount = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(
    (state) => state.user.currentUser.accessToken
  );

  const handleDeleteAccount = async () => {
    const { data } = await axios({
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "DELETE",
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/users/delete`,
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
