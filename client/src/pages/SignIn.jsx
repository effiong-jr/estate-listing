import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from "axios";
import useLoginUser from "../hooks/auth/useLoginUser";
import OAuth from "../components/OAuth";

const Login = () => {
  const { mutate, error, isPending, isSuccess } = useLoginUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    mutate(formData);
  };

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <div className="px-2 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>

      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-xs text-red-600">* Email is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-xs text-red-600">* Password is required</span>
          )}
        </div>

        <button
          disabled={isPending}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-wait"
        >
          {isPending ? "Loading..." : "Login"}
        </button>

        <OAuth />

        {error && (
          <p className="text-xs text-red-600">
            {error?.response?.data?.message}
          </p>
        )}
      </form>

      <div className="flex gap-2 pt-5">
        <p>Don&apos;t have and account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
