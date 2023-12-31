import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../utils/firebase";

import useUpdateUser from "../hooks/user/useUpdateUser";
import useDeleteAccount from "../hooks/user/useDeleteAccount";
import useLogout from "../hooks/auth/useLogout";
import useGetUserListings from "../hooks/user/useGetUserListings";
import useDeleteListing from "../hooks/user/useDeleteListing";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentate] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const { mutate, isPending, isError, error } = useUpdateUser();
  const { mutate: mutateDeleteUser, isPending: isDeletingUser } =
    useDeleteAccount();
  const { mutate: mutateLogout } = useLogout();

  const { refetch: refetchGetUserListings, data: userListings } =
    useGetUserListings();

  const { mutate: mutateDeleteListing } = useDeleteListing();

  const { register, handleSubmit } = useForm();

  const fileRef = useRef(null);

  console.log(location);

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

  const handleDeleteAccount = () => {
    mutateDeleteUser();
  };

  const handleSignOut = () => {
    mutateLogout();
  };

  const handleShowListings = () => {
    refetchGetUserListings();
  };

  const handleDeleteListing = (listingId) => {
    mutateDeleteListing(listingId);
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

        <Link
          to="/create-listing"
          className="bg-green-700 w-full p-2 text-white text-center uppercase rounded-lg hover:bg-green-500 disabled:bg-green-300 disabled:hover:cursor-not-allowed"
        >
          Create Listing
        </Link>

        <div className="text-red-700 flex justify-between w-full">
          <span
            className="cursor-pointer"
            onClick={handleDeleteAccount}
            disabled={isDeletingUser}
          >
            {isDeletingUser ? "Deleting account..." : "Delete Account"}
          </span>
          <span className="cursor-pointer" onClick={handleSignOut}>
            Logout
          </span>
        </div>

        <p className="text-red-700 text-sm">
          {isError ? error?.response?.data?.message : null}
        </p>
      </form>

      <div
        className="mx-auto w-max mt-4 text-green-700 hover:cursor-pointer"
        onClick={handleShowListings}
      >
        Show listings
      </div>

      {/* Listings */}
      <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
        {userListings?.length > 0 && (
          <h1 className="font-semibold text-2xl text-center my-4 ">
            Your Listings
          </h1>
        )}

        {(userListings || []).map((listing) => (
          <div
            key={listing._id}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <div className="border flex">
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  className="object-center object-fill h-16 w-16"
                />
              </Link>
            </div>
            <div className="text-slate-700 font-semibold flex flex-1 truncate text-center justify-center">
              <Link to={`/listing/${listing._id}`} className="truncate mx-3">
                {listing.name}
              </Link>
            </div>
            <div className="space-y-3">
              <Link to={`/update-listing/${listing._id}`}>
                <button
                  type="button"
                  className="text-green-700 uppercase text-sm font-semibold block"
                >
                  Edit
                </button>
              </Link>
              <button
                type="button"
                className="text-red-700 uppercase text-sm font-semibold block"
                onClick={() => handleDeleteListing(listing._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
