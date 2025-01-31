import React, { useContext, useEffect, useRef, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

import api from "../../util/api";
import AppContext from "../Context/AppContext";

type Props = {
  setToggleProfileMenu: Function;
  setChangePasswordModal: Function;
};
export default function ProfileMenu({
  setToggleProfileMenu,
  setChangePasswordModal,
}: Props) {
  const queryClient = useQueryClient();

  const { setPrompt } = useContext(AppContext);

  const router = useRouter();

  const Menu: any = useRef();

  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!Menu.current.contains(e.target)) {
        setToggleProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  const SignOutHandler = async () => {
    try {
      const token = getCookie("user");

      const response = await api.get("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Remove all cache query or data
        queryClient.removeQueries();

        // delete token
        deleteCookie("user");

        // remove user-info
        window.localStorage.clear();

        // redirect to login page
        router.reload();
      } else if (response.status === 401) {
        setPrompt({
          message: "Unauthorized!",
          type: "error",
          toggle: true,
        });
      }
    } catch (error) {
      setPrompt({
        message: "Unauthorized!",
        type: "error",
        toggle: true,
      });

      deleteCookie("user");

      router.push("/login");
    }
  };
  return (
    <>
      <ul
        ref={Menu}
        className="absolute w-[200px] z-50 top-[40px] shadow-lg right-0 bg-white text-ThemeRed"
      >
        <li
          className="cursor-pointer px-5 py-1 text-[16px] 1550px:text-[14px] hover:bg-ThemeRed hover:text-white"
          onClick={() => setChangePasswordModal(true)}
        >
          Change Password
        </li>
        <li
          className="cursor-pointer px-5 py-1 text-[16px] 1550px:text-[14px] hover:bg-ThemeRed hover:text-white"
          onClick={SignOutHandler}
        >
          Log Out
        </li>
      </ul>
    </>
  );
}
