import React, { useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdArrowForwardIos } from "react-icons/md";

import { FadeSide } from "../Animation/SimpleAnimation";
import AppContext from "../Context/AppContext";
import AccessSearch from "../Search/AccessSearch";
import BillingSearch from "../Search/BillingSearch";
import CheckPaymentSearch from "../Search/CheckPaymentSearch";
import CorporateSearch from "../Search/CorporateSearch";
import CustomerSearch from "../Search/CustomerSearch";
import FavoriteReportSearch from "../Search/FavoriteReportSearch";
import JournalSearch from "../Search/JournalSearch";
import PaymentRegisterSearch from "../Search/PaymentRegisterSearch";
import PropertySearch from "../Search/PropertySearch";
import AdjustmentSearch from "../Search/SearchAdjusment";
import UserSearch from "../Search/UserSearch";
import MenuLink from "./MenuLink";
import { SidebarLinks } from "./PagesUrl";
import Submenu from "./Submenu";

type SidebarType = {
  isProfileSearch: boolean;
  setProfileSearch: Function;
  isPathName: string;
  setHide: Function;
  isWide: boolean;
  isWindow: any;
};

export default function Sidebar({
  isProfileSearch,
  setProfileSearch,
  isPathName,
  setHide,
  isWide,
  isWindow,
}: SidebarType) {
  const SideBarMenu = SidebarLinks();

  const router = useRouter();
  const ValidateParentUrl = router.pathname.split("/")[1];
  const { collapseSide, setCollapseSide } = useContext(AppContext);
  // click outside close sidebar
  const modal = useRef<any>();
  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!modal.current.contains(e.target)) {
        if (window.innerWidth < 1024) setHide(true);
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });
  return (
    <>
      <motion.aside
        ref={modal}
        variants={FadeSide}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`z-[99999] transition-all duration-200 ease-linear fixed h-screen overflow-y-auto overflow-x-hidden left-0 top-0 bg-[#fcfcff] ${
          isWide ? "w-wide" : "w-no-wide"
        } ${
          collapseSide && !isWide && "collapse"
        } border-r-2 border-white min-h-full flex flex-col z-50`}
      >
        <AnimatePresence>
          {!collapseSide && (
            <motion.div
              variants={FadeSide}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-0 left-0 w-full flex justify-center mt-5 h-28 items-center 1550px:mt-0"
            >
              <Image src="/Images/deus.png" width={250} height={100} alt="" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full h-full flex mt-28">
          <ul className={` self-start ${!isProfileSearch && "w-full"}`}>
            <div className=" flex justify-end my-3 items-center px-5 duration-75">
              {/* Collapse Arrow */}
              {isWindow > 820
                ? router.query.id === undefined && (
                    <MdArrowForwardIos
                      className={`cursor-pointer text-[24px] duration-100 ease-out text-ThemeRed ${
                        !collapseSide && "rotate-180"
                      }`}
                      onClick={() => setCollapseSide(!collapseSide)}
                    />
                  )
                : ""}

              {/* Show the toggle arrow icon */}
              {router.query.id !== undefined && (
                <motion.div
                  layout
                  transition={{
                    duration: 0.2,
                    ease: "linear",
                  }}
                >
                  <MdArrowForwardIos
                    className={`cursor-pointer text-[24px] duration-100 ease-out text-ThemeRed ${
                      !isProfileSearch && "rotate-180"
                    }`}
                    onClick={() => setProfileSearch(!isProfileSearch)}
                  />
                </motion.div>
              )}
            </div>

            {SideBarMenu.map((item, index) => (
              <MenuLink
                key={index}
                isProfileSearch={isProfileSearch}
                url={item.url}
                iconUrl={item.iconUrl}
                urlName={item.name}
                ActiveUrl={item.ActiveUrl}
                closeOnClick={() => {
                  window.innerWidth < 1024 && setHide(true);
                }}
              >
                {ValidateParentUrl === item.ActiveUrl &&
                  item.name !== "dashboard" &&
                  item.SubMenu.length !== 0 && (
                    <Submenu
                      SubmenuDetail={item.SubMenu}
                      closeOnClick={() => {
                        window.innerWidth < 1024 && setHide(true);
                      }}
                    />
                  )}
              </MenuLink>
            ))}
          </ul>
          {/* Pages, where the Search will show */}
          <div className="shadow-2xl flex-1">
            <AnimatePresence>
              {isProfileSearch && (
                <motion.ul
                  variants={FadeSide}
                  className=" w-full overflow-hidden h-full bg-[#f1f2f5]"
                >
                  {isPathName.includes("corporate/") && <CorporateSearch />}
                  {isPathName.includes("user/") && <UserSearch />}
                  {isPathName.includes("customer/") && <CustomerSearch />}
                  {isPathName.includes("property/") && <PropertySearch />}
                  {router.pathname.includes("journal-list/[id]") && (
                    <JournalSearch />
                  )}
                  {router.pathname.includes("invoice-list/[id]") && (
                    <BillingSearch />
                  )}
                  {router.pathname.includes("payment-register/[id]") && (
                    <PaymentRegisterSearch />
                  )}
                  {router.pathname.includes("adjustment-list/[id]") && (
                    <AdjustmentSearch />
                  )}
                  {router.pathname.includes("access/[id]") && <AccessSearch />}
                  {router.pathname.includes("check-payment-list/[id]") && (
                    <CheckPaymentSearch />
                  )}
                  {router.pathname.includes("favorite-list-reports/[id]") && (
                    <FavoriteReportSearch />
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
