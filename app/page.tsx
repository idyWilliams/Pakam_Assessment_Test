"use client";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import PasswordInput from "@/components/PasswordInput";
import { useRegister } from "@/service/hooks";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export default function Home() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const registerUser = useRegister();
    const { push } = useRouter();

  const passwordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    registerUser
      .mutateAsync(data)
      .then((res) => {
        push("/login");
        toast("Registration Successful");
      })
      .catch((err) => {});
    // console.log(data);
  };
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-[#C2C2C2]">
      <div className="border border-#E5E7EB p-4 rounded-xl w-[960px] h-[600px] bg-[#fff] flex flex-col  justify-center">
        <div className="flex items-center justify-center mb-3">
          <Image
            src="/asset/Logo.svg"
            alt="pakam Logo"
            className="text-center"
            width={100}
            height={24}
            priority
          />
        </div>
        <p className="text-center text-[24px] leading-[38px] text-[#222D33] font-bold mb-8">
          Create Account
        </p>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className=" flex w-full px-5 justify-center gap-9">
              <div className="w-[50%]">
                <div className="mb-10">
                  <label
                    htmlFor={"firstName"}
                    className="block font-medium mb-1 text-[14px] leading-[22px] text-[#222D33]"
                  >
                    First name
                  </label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your First name"
                        className={`w-full p-2 rounded border ${
                          errors.firstName ? "border-[#a10]" : "border-#E5E7EB"
                        } focus:border-[#005700] focus:outline-none placeholder:text-[16px] placeholder:leading-[28px] text-[#222D33] placeholder:font-normal placeholder:text-opacity-100`}
                      />
                    )}
                  />
                  <p className="text-[#a10]">{errors.firstName?.message}</p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={"username"}
                    className="block font-medium mb-1 text-[14px] leading-[22px] text-[#222D33]"
                  >
                    Username
                  </label>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your Username"
                        className={`w-full p-2 rounded border ${
                          errors.firstName ? "border-[#a10]" : "border-#E5E7EB"
                        } focus:border-[#005700] focus:outline-none placeholder:text-[16px] placeholder:leading-[28px] text-[#222D33] placeholder:font-normal placeholder:text-opacity-100`}
                      />
                    )}
                  />
                  <p className="text-[#a10]">{errors.username?.message}</p>
                </div>
              </div>
              <div className="w-[50%]">
                <div className="mb-10">
                  <label
                    htmlFor={"lasttName"}
                    className="block font-medium mb-1 text-[14px] leading-[22px] text-[#222D33]"
                  >
                    Last name
                  </label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your Last name"
                        className={`w-full p-2 rounded border ${
                          errors.firstName ? "border-[#a10]" : "border-#E5E7EB"
                        } focus:border-[#005700] focus:outline-none placeholder:text-[16px] placeholder:leading-[28px] text-[#222D33] placeholder:font-normal placeholder:text-opacity-100`}
                      />
                    )}
                  />
                  <p className="text-[#a10]">{errors.lastName?.message}</p>
                </div>

                <div className="mb-4 relative">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <PasswordInput
                        label="Password"
                        type="password"
                        placeholder="Enter your Password"
                        //@ts-ignore
                        field={field}
                        error={errors.password}
                        isPassword={true}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full mt-7">
              <button
                // disabled={false}
                type="submit"
                className="flex items-center justify-center disabled:opacity-60 py-3 w-80 disabled:cursor-not-allowed cursor-pointer rounded-xl bg-[#005700] text-[#fff] text-center"
              >
                {registerUser.isPending ? (
                  <svg
                    className="animate-spin h-7 w-7 mr-3 text-white"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="white"
                    />
                    <path
                      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  "Create Account"
                )}
              </button>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-[14px] leading-[16px] text-[#464F54] font-extralight active:scale-75 ease-in-out">
                  Forgot Password?{" "}
                </span>
                <span className="text-[14px] leading-[22px] text-[#005700] font-medium active:scale-75 ease-in-out">
                  Retrieve Now
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p className="text-center text-[#295011] text-[16px] leading-[28px] font-bold mt-10">
        Powered by Pakam Technology
      </p>
    </main>
  );
}
