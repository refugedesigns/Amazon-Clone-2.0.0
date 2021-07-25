import { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Head from "next/head";
import AmazonBlack from "../assets/amazonblack.png";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password1: yup.string().min(8).required(),
  password2: yup.string().min(8).required(),
});

const Signup = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const signupHandler = (data) => {
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password1,
        confirmPassword: data.password2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json()).then(data => router.replace("/signin"))
      .catch((err) => console.log(err));
    reset();
  };

  return (
    <Fragment>
      <Head>
        <title>Amazon 2.0.0 Signup</title>
      </Head>
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
          <h2 className="text-3xl font-semibold text-gray-800">
            Create account
          </h2>

          <form
            className="space-y-4 flex flex-col"
            onSubmit={handleSubmit(signupHandler)}
          >
            <div>
              <label
                className="text-sm font-semibold text-gray-800"
                htmlFor="name"
              >
                Your name
              </label>
              <input
                {...register("name")}
                className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                type="text"
                id="name"
              />
              {errors.name && (
                <p className="text-xs text-red-700">{errors.name.message}</p>
              )}
            </div>
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
              {errors.email && (
                <p className="text-xs text-red-700">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                className="text-sm font-semibold text-gray-800 flex justify-between"
                htmlFor="password1"
              >
                Password
              </label>
              <input
                {...register("password1")}
                className="w-80 p-1 my-1 border rounded-sm placeholder-italic focus:outline-none focus:ring-1 focus:ring-yellow-500"
                type="password"
                id="passowrd1"
                placeholder="At least 8 charactors"
              />
              {errors.password1 && (
                <p className="text-xs text-red-700">
                  {errors.password1.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm font-semibold text-gray-800 flex justify-between"
                htmlFor="password2"
              >
                Re-enter password
              </label>
              <input
                {...register("password2")}
                className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                type="password"
                id="passowrd2"
              />
              {errors.password2 && (
                <p className="text-xs text-red-700">
                  {errors.password2.message}
                </p>
              )}
            </div>
            <button
              className="button"
              onClick={() => {
                [
                  {
                    type: "manual",
                    name: "name",
                    message: "please provide a valid name",
                  },
                  {
                    type: "manual",
                    name: "email",
                    message: "please provide a valid email",
                  },
                  {
                    type: "manual",
                    name: "password1",
                    message:
                      "provide a strong password, min 8 including a symbol, uppercase and lowercase letters",
                  },
                  {
                    type: "manual",
                    name: "password2",
                    message: "please provide a matching password",
                  },
                ].forEach(({ name, type, message }) =>
                  setError(name, { type, message })
                );
              }}
            >
              Sign-Up
            </button>
          </form>

          <p className="text-xs text-gray-800">
            By creating an account, you agree to Amazon's{" "}
            <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500">
              Conditions of Use
            </span>{" "}
            and{" "}
            <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500">
              Privacy Notice.
            </span>
          </p>

          <hr />

          <p className="text-xs text-gray-800">
            Already have an account?
            <span
              className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500"
              onClick={() => router.push("/signin")}
            >
              {" "}
              Sign in{" "}
            </span>
          </p>
        </div>
      </div>
      <hr className="mt-8 border-gray-300" />
    </Fragment>
  );
};

export default Signup;
