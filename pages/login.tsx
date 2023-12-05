import React, { useState, useEffect, useContext } from "react";
import { setCookie } from "cookies-next";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaKey, FaEnvelope } from "react-icons/fa";
import { ScaleLoader, MoonLoader } from "react-spinners";

import AppContext from "../components/Context/AppContext";
import { SendLink } from "../components/ReactQuery/ForgotPassword";
import ModalTemp from "../components/Reusable/ModalTemp";
import PrompMessage from "../components/Reusable/PrompMessage";
import api from "../util/api";

export default function Login() {
  const router = useRouter();
  const { setPrompt, togglePrompt } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [isUsername, setUsername] = useState("");
  const [isPassword, setPassword] = useState("");
  const [CheckRemember, setCheckRemember] = useState(false);
  const [inValid, setInvalid] = useState("");
  const [isSuccess, setSuccess] = useState<boolean | null>(false);
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexLetterAndNumber = /^[A-Za-z0-9]+$/;

  const [isEye, setEye] = useState(false);

  const ValidateLogin = async (e: any) => {
    e.preventDefault();

    if (!regexEmail.test(isUsername)) {
      setInvalid("Invalid Email");

      setSuccess(false);

      return;
    }
    if (!regexLetterAndNumber.test(isPassword)) {
      setInvalid("Invalid password, special characters are not allowed");

      setSuccess(false);

      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: isUsername,
        password: isPassword,
      });

      const { token } = await response.data;

      const responseUserInfo = await api.get("/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const UserInfo = JSON.stringify(responseUserInfo?.data);

      localStorage.setItem("userInfo", UserInfo);

      if (CheckRemember === true) {
        localStorage.setItem("username", isUsername);
        localStorage.setItem("password", isPassword);
      }

      setPrompt({
        message: "Successfully login",
        type: "success",
        toggle: true,
      });

      setCookie("user", token);

      router.push("/dashboard");

      setInvalid("");

      setSuccess(true);
    } catch (error: any) {
      setSuccess(false);

      if (error?.response?.status === 401) {
        setPrompt({
          message: error?.response?.data?.error,
          type: "error",
          toggle: true,
        });
        const message = error?.response?.data?.error;
        setInvalid(message);
      } else {
        setInvalid(error?.message);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    setUsername(localStorage.username);
    setPassword(localStorage.password);
    if (
      localStorage.username !== undefined &&
      localStorage.password !== undefined
    ) {
      setCheckRemember(true);
    }
  }, []);

  const RememberMe = (e: any) => {
    if (CheckRemember === true) {
      setCheckRemember(false);
      localStorage.removeItem("password");
      localStorage.removeItem("username");
    }
    if (CheckRemember === false) {
      setCheckRemember(true);
    }
  };

  const SuccessSendLink = () => {
    setPrompt({
      message: "Email sent successfully",
      type: "success",
      toggle: true,
    });
    setSuccess(true);
    setToggleModal(false);
    setInvalid("Email sent successfully!");
  };
  const ErrorSendLink = (e: any) => {
    setPrompt({
      message: "Email not found!",
      type: "error",
      toggle: true,
    });
    setSuccess(false);
    setToggleModal(false);
    setInvalid("Email not found!");
  };
  const { mutate, isLoading: SendLinkLoading } = SendLink(
    SuccessSendLink,
    ErrorSendLink
  );

  const [toggleModal, setToggleModal] = useState(false);

  const forgotHandler = () => {
    if (!regexEmail.test(isUsername)) {
      setInvalid("Invalid email");
      setSuccess(false);
      return;
    } else {
      setInvalid("");
      mutate(isUsername);
    }
  };

  return (
    <>
      <Head>
        <title>Boroughcrest - login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AnimatePresence>
        {togglePrompt.toggle && <PrompMessage />}
      </AnimatePresence>

      {toggleModal && (
        <ModalTemp narrow={true}>
          <h1 className="text-center">
            Do you want to receive an email to reset your password?
          </h1>
          <div className="flex justify-end items-center pt-5">
            <button
              className="button_cancel"
              onClick={() => setToggleModal(false)}
            >
              CANCEL
            </button>
            <button className="buttonRed" onClick={forgotHandler}>
              {SendLinkLoading ? (
                <ScaleLoader color="#fff" height="10px" width="2px" />
              ) : (
                "SEND"
              )}
            </button>
          </div>
        </ModalTemp>
      )}
      <form
        onSubmit={ValidateLogin}
        className=" min-h-screen flex justify-center items-center bg-ThemeRed"
      >
        <div className=" w-11/12 max-w-[1200px] 1366px:max-w-[1000px] 480px:w-[95%] bg-white relative h-[80vh] 640px:h-auto">
          <aside className=" absolute z-0 h-full w-full top-0 left-0">
            <Image
              src="/Images/LoginBG.png"
              alt="Background"
              priority
              layout="fill"
            />
          </aside>
          <ul className=" w-full h-full flex flex-wrap z-10 relative">
            <li className=" flex flex-col justify-center p-16 1366px:p-10 items-center w-4/12 820px:w-5/12 640px:w-full py-10 640px:p-5 bg-[#000000b7]">
              <Image
                src="/Images/deus.png"
                priority
                alt="DEUS logo"
                width={400}
                height={150}
              />
            </li>
            <li className=" w-8/12 820px:w-7/12 bg-[#e5e4e455] flex flex-col 640px:w-full">
              <section className=" p-16 820px:p-10 640px:p-5 flex flex-col items-start justify-center flex-1">
                <p className=" text-ThemeRed text-[30px] mb-1 font-NHU-medium 640px:mb-0 640px:text-[24px]">
                  Log In
                </p>
                <h2 className=" text-[20px] mb-10 font-bold font-NHU-bold 640px:mb-5 640px:text-[16px]">
                  Enter your login details
                </h2>

                <h5 className=" text-[15px] mb-1 font-medium text-LiteBlac 640px:text-[12px]">
                  EMAIL ADDRESS
                </h5>
                <div className=" flex items-center border-2 border-gray-300 px-2 py-1 bg-white w-full max-w-[400px] mb-5 640px:mb-4">
                  <FaEnvelope className=" mr-2 text-ThemeRed" />
                  <input
                    type="email"
                    value={isUsername}
                    required
                    onChange={(e: any) =>
                      e.target.value.length <= 320 &&
                      setUsername(e.target.value)
                    }
                    name="username"
                    className="flex-1 outline-none text-16px "
                    placeholder="Enter Email Address"
                  />
                </div>
                <h5 className=" text-[15px] mb-1 font-medium text-LiteBlack 640px:text-[12px]">
                  PASSWORD
                </h5>
                <div className=" flex items-center border-2 border-gray-300 px-2 py-1 bg-white w-full max-w-[400px] mb-5">
                  <FaKey className=" mr-2 text-ThemeRed" />
                  <input
                    type={`${!isEye ? "password" : "text"}`}
                    value={isPassword}
                    name="password"
                    required
                    onChange={(e: any) =>
                      e.target.value.length <= 320 &&
                      setPassword(e.target.value)
                    }
                    className="flex-1 outline-none text-16px"
                    placeholder="Enter Password"
                  />
                  <div
                    onClick={() => setEye(!isEye)}
                    className="text-ThemeRed text-[20px]"
                  >
                    {!isEye ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </div>
                </div>
                {inValid && (
                  <p
                    className={`text-[16px] ${
                      isSuccess ? " text-Green" : "text-ThemeRed"
                    } font-NHU-bold mb-5`}
                  >
                    {inValid}
                  </p>
                )}
                <div className=" flex items-center justify-between w-full max-w-[400px] mb-5 640px:mb-4">
                  {isLoading ? (
                    <div className=" flex justify-center w-32 py-1 bg-white pointer-events-none rounded-lg text-white text-[14px] hover:shadow-lg duration-75 ease-in-out font-medium hover:bg-white hover:text-ThemeRed">
                      <div className="flex items-center my-1">
                        <ScaleLoader
                          color="#8f384d"
                          height="10px"
                          width="2px"
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className=" w-32 py-1 bg-ThemeRed rounded-lg text-white text-[14px] hover:shadow-lg duration-75 ease-in-out font-medium hover:bg-white hover:text-ThemeRed"
                    >
                      <div className="flex items-center justify-center">
                        LOG IN
                      </div>
                    </button>
                  )}

                  <div className=" flex items-center">
                    <input
                      type="checkbox"
                      id="rememberme"
                      className="mr-1 h-4 w-4 rounded-md after:text-[11px]"
                      checked={CheckRemember}
                      onChange={RememberMe}
                    />

                    <label htmlFor="rememberme" className=" cursor-pointer">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className=" flex items-center justify-between w-full max-w-[400px] mb-5 640px:mb-4">
                  <p
                    onClick={() => setToggleModal(true)}
                    className="text-ThemeRed hover:underline text-[14px] cursor-pointer"
                  >
                    Forgot Password
                  </p>
                </div>
              </section>
              <div className="px-5 640px:px-5 flex justify-end">
                <p className=" text-ThemeRed font-medium mb-5 tracking-tight text-[14px]">
                  © 2022 Boroughcrest Property Managament Systems Corp. All
                  rights reserved.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </>
  );
}

Login.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
