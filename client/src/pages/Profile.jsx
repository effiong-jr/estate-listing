import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { register, handleSubmit } = useForm();

  const handleFormSubmit = () => {};

  console.log({ ...register });

  return (
    <div>
      <h1 className="font-semibold my-7 text-center text-3xl">Profile</h1>

      <form
        className="flex flex-col items-center max-w-lg mx-auto gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <img
          src={currentUser?.avatar}
          className="rounded-full object-cover text-center w-24 h-24 mt-2"
        />

        <input
          type="email"
          placeholder="Email"
          className="p-3 w-full rounded-lg"
          defaultValue={currentUser?.email}
          {...register("email")}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 w-full rounded-lg"
          {...register("password")}
        />

        <button className="bg-slate-700 w-full p-2 text-white uppercase rounded-lg hover:bg-slate-500 disabled:bg-slate-300 disabled:hover:cursor-not-allowed">
          update
        </button>

        <div className="text-red-700 flex justify-between w-full">
          <span type="button" className="cursor-pointer">
            Delete Account
          </span>
          <span className="cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
