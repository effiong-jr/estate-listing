import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import useGoogle from "../hooks/auth/useGoogle";
import { useEffect } from "react";

const OAuth = () => {
  const navigate = useNavigate();

  const { mutate: signInWithGoogleMutation, isSuccess } = useGoogle();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const { email, photoURL } = result.user;

      signInWithGoogleMutation({ email, photoURL });
    } catch (error) {
      console.log("Error signing in with google", error);
    }
  };

  return (
    <button
      onClick={handleSignInWithGoogle}
      type="button"
      className="bg-red-700 hover:bg-opacity-95 uppercase rounded-lg text-white p-3"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
