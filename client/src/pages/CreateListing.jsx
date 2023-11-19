import { useForm } from "react-hook-form";

const CreateListing = () => {
  const { register, handleSubmit, watch } = useForm();

  const watchOffer = watch("offer");
  const watchType = watch("type");

  const handleCreateListing = (data) => {
    console.log(data);
  };
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form
        onSubmit={handleSubmit(handleCreateListing)}
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
                id="sell"
                className="w-5"
                value={"sell"}
                {...register("type")}
              />
              <label htmlFor="sell">Sell</label>
            </div>

            <div className="flex gap-3">
              <input
                type="radio"
                value={"rent"}
                name="type"
                id="rent"
                className="w-5"
                {...register("type")}
              />
              <label htmlFor="rent">Rent</label>
            </div>

            <div className="flex gap-3">
              <input
                type="checkbox"
                name="funished"
                id="funished"
                className="w-5"
                {...register("funished")}
              />
              <label htmlFor="funished">Funished</label>
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
                {...register("beds", { required: true })}
                min={1}
                max={99}
                defaultValue={1}
                id="beds"
                name="beds"
              />
              <label htmlFor="beds">Beds</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-12 h-8 text-center p-e-3 border-gray-700 border-2 rounded-lg"
                {...register("baths", { required: true })}
                min={1}
                max={99}
                defaultValue={1}
                id="baths"
                name="baths"
              />
              <label htmlFor="baths">Baths</label>
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
                {watchType === "rent" && (
                  <span className="block text-sm">($ / month)</span>
                )}
              </label>
            </div>

            {watchOffer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-28 h-8 text-center p-e-3 border-gray-700 border-2 rounded-lg"
                  {...register("discountPrice", {
                    required: watchOffer ? true : false,
                  })}
                  min={0}
                  defaultValue={0}
                  id="discountPrice"
                  name="discountPrice"
                />
                <label htmlFor="discountPrice" className="text-center">
                  <span className="block">Discounted Price</span>
                  {watchType === "rent" && (
                    <span className="block text-sm">($ / month)</span>
                  )}
                </label>
              </div>
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
              className="p-3 rounded border border-gray-300 w-full"
              {...register("images")}
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>

          <button className="bg-gray-700 hover:opacity-80 text-white uppercase rounded p-3 mt-3">
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
