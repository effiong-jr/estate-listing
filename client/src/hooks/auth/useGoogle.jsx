import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/user";
import axiosInstance from "../../utils/axios";

const useGoogle = () => {
  const dispatch = useDispatch();

  const handleAuthWithGoogle = async ({ email, photoURL }) => {
    //Call signin with google endpoint
    const { data } = await axiosInstance({
      method: "POST",
      url: `/users/google`,
      data: { email, photoURL },
    });
    return data;
  };

  // Send details to database
  const signInWithGoogleMutation = useMutation({
    mutationFn: handleAuthWithGoogle,
    onSuccess: (data) => {
      // Get user details response from DB and setCurrentUser on redux
      dispatch(setCurrentUser(data?.data));
    },
  });

  return signInWithGoogleMutation;
};

export default useGoogle;
