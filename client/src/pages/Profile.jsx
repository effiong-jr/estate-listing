import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../utils/firebase";

import useUpdateUser from "../hooks/user/useUpdateUser";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentate] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const { mutate, isPending, isError, error } = useUpdateUser();

  const { register, handleSubmit } = useForm();

  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);

  const handleUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setFileUploadError(false);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentate(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);
      }
    );
  };

  const handleFormSubmit = (formData) => {
    mutate({ imageURL, ...formData });
  };

  return (
    <div>
      <h1 className="font-semibold my-7 text-center text-3xl">Profile</h1>

      <form
        className="flex flex-col items-center max-w-lg mx-auto gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={imageURL || currentUser?.userDetails?.avatar}
          onClick={() => fileRef.current.click()}
          className="rounded-full object-cover text-center w-24 h-24 mt-2"
        />

        <p>
          {fileUploadError ? (
            <span className="text-red-700 text-12">
              Image Upload Error (Image must be less than 2mb)
            </span>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <span className="text-slate-700 text-sm">{`Uploading... ${uploadPercentage}%`}</span>
          ) : uploadPercentage === 100 ? (
            <span className="text-green-700 text-sm">
              Image uploaded successfully!
            </span>
          ) : null}
        </p>

        <input
          type="email"
          placeholder="Email"
          className="p-3 w-full rounded-lg"
          defaultValue={currentUser?.userDetails?.email}
          {...register("email")}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 w-full rounded-lg"
          {...register("password")}
        />

        <button
          className="bg-slate-700 w-full p-2 text-white uppercase rounded-lg hover:bg-slate-500 disabled:bg-slate-300 disabled:hover:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Update"}
        </button>

        <div className="text-red-700 flex justify-between w-full">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign out</span>
        </div>

        <p className="text-red-700 text-sm">{isError ? error.message : null}</p>
      </form>
    </div>
  );
};

export default Profile;
