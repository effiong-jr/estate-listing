import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/user";

const useGoogle = () => {
  const dispatch = useDispatch();

  const handleAuthWithGoogle = async ({ email, photoURL }) => {
    //Call signin with google endpoint
    const { data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/users/google`,
      data: { email, photoURL },
    });
    return data;
  };

  // Send details to database
  const signInWithGoogleMutation = useMutation({
    mutationFn: handleAuthWithGoogle,
    onSuccess: (data) => {
      // Get user details response from DB and setCurrentUser on redux
      dispatch(setCurrentUser(data?.data?.user));
    },
  });

  return signInWithGoogleMutation;
};

export default useGoogle;