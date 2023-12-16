import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import {
  //   deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import useCreateListing from "../hooks/user/useCreateListing";
import useUpdateListing from "../hooks/user/useUpdateListing";
import useGetUserListing from "../hooks/user/useGetUserListing";

const CreateListing = () => {
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [imagesURL, setImagesURL] = useState([]);
  const [isStoringImage, setIsStoringImage] = useState(false);

  const location = useLocation();

  const { id: listingId } = useParams();

  const { pathname } = location;

  const isUpdateScreen = pathname.includes("update-listing");

  const defaultValues = {
    name: "",
    description: "",
    address: "",
    type: "rent",
    furnished: true,
    parking: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, clearErrors },
  } = useForm({
    defaultValues,
  });

  const { data: listingResponse } = useGetUserListing(listingId);
  const { mutate, isPending } = useCreateListing();
  const { mutate: mutateUpdateListing, isPending: isPendingUpdateListing } =
    useUpdateListing();

  console.log(listingResponse);

  const handleUploadImages = async () => {
    const promises = [];

    // Check number of images for upload
    // Min: 1, max: 6
    setUploadImageError(null);
    if (!uploadedFiles || uploadedFiles.length === 0) {
      setUploadImageError("Upload at least one image");
      return;
    } else if (
      (uploadedFiles && uploadedFiles.length > 6) ||
      uploadedFiles.length + imagesURL.length > 6
    ) {
      setUploadImageError("Maximum of 6 images allowed");
      return;
    }

    setIsStoringImage(true);

    for (let file of Object.values(uploadedFiles)) {
      const res = await storeImage(file);
      promises.push(res);
    }

    Promise.all(promises)
      .then((imageUrl) => {
        setImagesURL((prevData) => [...prevData, ...imageUrl]);
      })
      .catch((error) => {
        setUploadImageError("Image upload failed");
        console.log(error);
      })
      .finally(() => {
        setIsStoringImage(false);
      });
  };

  const storeImage = async (file) => {
    const storage = getStorage(app);

    const promiseResponse = new Promise((resolve, reject) => {
      const listingImageRef = ref(
        storage,
        new Date().getTime() + file.name.replaceAll(" ", "_")
      );

      const uploadTask = uploadBytesResumable(listingImageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(imageURL);
        }
      );
    });

    return promiseResponse;
  };

  const handleDeleteImage = (imageURL) => {
    setImagesURL((prevData) => prevData.filter((url) => url != imageURL));
    // const storage = getStorage(app);
    // const imageRefForDelete = ref(storage, imageURL);

    // deleteObject(imageRefForDelete)
    //   .then(() => console.log("Image deleted successfully"))
    //   .catch((error) => {
    //     console.log("Error deleting Image", error);
    //   });
  };

  const handleCreateListing = (data) => {
    // console.log({ ...data, imageUrls: imagesURL });
    mutate({ ...data, imageUrls: imagesURL });
  };

  const handleUpdateListing = (data) => {
    console.log(data);
    mutateUpdateListing({ ...data, imageUrls: imagesURL });
  };

  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {isUpdateScreen ? `Update` : "Create a"} Listing
      </h1>
      <form
        onSubmit={handleSubmit(
          isUpdateScreen ? handleUpdateListing : handleCreateListing
        )}
        className="flex flex-col sm:flex-row text-md gap-5"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            {...register("name", {
              required: true,
              maxLength: 62,
              minLength: 5,
            })}
            placeholder="Name"
            className="p-3 rounded-lg"
          />

          <textarea
            type="text"
            {...register("description", {
              required: true,
            })}
            placeholder="Description"
            className="p-3 rounded-lg"
          />

          <input
            type="text"
            {...register("address", {
              required: true,
              maxLength: 62,
              minLength: 5,
            })}
            placeholder="Address"
            className="p-3 rounded-lg"
          />

          {/* Listing checkboxes */}
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-3">
              <input
                type="radio"
                name="type"
                id="sale"
                className="w-5"
                value={"sale"}
                checked={watch("type") === "sale"}
                {...register("type")}
              />
              <label htmlFor="sale">Sale</label>
            </div>

            <div className="flex gap-3">
              <input
                type="radio"
                value={"rent"}
                name="type"
                id="rent"
                checked={watch("type") === "rent"}
                className="w-5"
                {...register("type")}
              />
              <label htmlFor="rent">Rent</label>
            </div>

            <div className="flex gap-3">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                checked={watch("furnished") === true}
                {...register("furnished")}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>

            <div className="flex gap-3">
              <input
                type="checkbox"
                name="packing"
                id="packing"
                className="w-5"
                {...register("packing")}
              />
              <label htmlFor="packing">Packing Spot</label>
            </div>

            <div className="flex gap-3">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                {...register("offer")}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          {/*  Numbers Inputs*/}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-12 h-8 text-center p-e-3 border-gray-700 border-2 rounded-lg"
                {...register("bedrooms", { required: true })}
                min={1}
                max={99}
                id="bedrooms"
                name="bedrooms"
              />
              <label htmlFor="bedrooms">Bed Rooms</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-12 h-8 text-center p-e-3 border-gray-700 border-2 rounded-lg"
                {...register("bathrooms", { required: true })}
                min={1}
                max={99}
                id="bathrooms"
                name="bathrooms"
              />
              <label htmlFor="bathrooms">Bathrooms</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-28 h-8 text-center p-e-3 border-gray-700 border-2 rounded-lg"
                {...register("regularPrice", { required: true })}
                min={0}
                defaultValue={0}
                id="regularPrice"
                name="regularPrice"
              />
              <label htmlFor="regularPrice" className="text-center">
                <span className="block">Regular Price</span>
                {watch("type") === "rent" && (
                  <span className="block text-sm">($ / month)</span>
                )}
              </label>
            </div>

            {watch("offer") && (
              <>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-28 h-8 text-center p-e-3 border-gray-700 border-2 rounded-lg"
                    {...register("discountPrice", {
                      required: watch("offer") ? true : false,
                    })}
                    min={0}
                    // id="discountPrice"
                    // name="discountPrice"
                    onChange={(e) => {
                      const discountPriceValue = e.target.value;
                      const regularPrice = Number(watch("regularPrice"));
                      if (discountPriceValue > regularPrice) {
                        setError("discountPrice", {
                          message:
                            "Discounted price should be less than original price",
                        });
                      } else {
                        clearErrors();
                      }
                    }}
                  />
                  <label htmlFor="discountPrice" className="text-center">
                    <span className="block">Discounted Price</span>
                    {watch("type") === "rent" && (
                      <span className="block text-sm">($ / month)</span>
                    )}
                  </label>
                </div>

                {errors.discountPrice && (
                  <p className="text-xs text-red-700 font-semibold">
                    {errors.discountPrice.message}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p>
            <span className="font-semibold text-sm">Images:</span>{" "}
            <span>
              The first image will be used as the cover. (max: 6 images)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              multiple
              required
              className="p-3 rounded border border-gray-300 w-full"
              {...register("images", {
                onChange: (e) => setUploadedFiles(e.target.files),
              })}
            />
            <button
              type="button"
              disabled={isStoringImage}
              onClick={handleUploadImages}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {isStoringImage ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-sm text-red-700 text-center">{uploadImageError}</p>
          <button
            disabled={isPending}
            className="bg-gray-700 hover:opacity-80 text-white uppercase rounded p-3 mt-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUpdateScreen
              ? isPendingUpdateListing
                ? "Updating..."
                : "Update Listing"
              : isPending
              ? "Creating..."
              : "Create Listing"}
          </button>

          <div className="gap-5 flex flex-col">
            {imagesURL.map((url) => (
              <div
                key={url}
                className="rounded-lg flex justify-between border items-center p-3"
              >
                <img
                  src={url}
                  alt="listing img"
                  className="object-contain  h-20 w-20"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(url)}
                  className="text-red-700 hover:opacity-75 text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
