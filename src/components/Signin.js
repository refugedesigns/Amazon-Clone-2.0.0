import { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AmazonBlack from "../assets/amazonblack.png";

import { signIn } from "next-auth/client";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Signin = () => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signinHandler = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result.error) {
      router.replace("/");
    }
    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <Fragment>
      <div className="mx-auto w-min flex flex-col mt-4">
        <Image
          src={AmazonBlack}
          width={150}
          height={40}
          objectFit="contain"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="flex flex-col border border-gray-300 rounded-md mt-4 p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Sign-In</h2>

          <form
            className="space-y-4 flex flex-col"
            onSubmit={handleSubmit(signinHandler)}
          >
            <div>
              <label
                className="text-sm font-semibold text-gray-800"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email")}
                className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                type="email"
                id="email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label
                className="text-sm font-semibold text-gray-800 flex justify-between"
                htmlFor="password"
              >
                Password{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Forgot your password?
                </span>
              </label>
              <input
                {...register("password")}
                className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                type="password"
                id="passowrd"
              />
              {errors.password && (
                <p className="text-xs text-red-700">
                  {errors.password.message}
                </p>
              )}
            </div>

            <p className="text-xs text-gray-800">
              By continuing, you agree to Amazon's{" "}
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500">
                Conditions of Use
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500">
                Privacy Notice.
              </span>
            </p>

            <button
              className="button"
              onClick={() => {
                [
                  {
                    type: "manual",
                    name: "email",
                    message: "please provide a email",
                  },
                  {
                    type: "manual",
                    name: "password",
                    message: "your password must be a min of 8 chars",
                  },
                ].forEach(({ name, type, message }) =>
                  setError(name, { type, message })
                );
              }}
            >
              Sign-In
            </button>
          </form>
        </div>

        <div className="flex flex-col mt-8 space-y-4">
          <div className="flex items-center justify-center space-x-1">
            <hr className="w-32" />
            <p className="text-xs text-gray-500">New to Amazon?</p>
            <hr className="w-32" />
          </div>
          <button
            className="button-light"
            onClick={() => router.push("/signup")}
          >
            Create your Account
          </button>
        </div>
      </div>
      <hr className="mt-8 border-gray-300" />
    </Fragment>
  );
};

export default Signin;
