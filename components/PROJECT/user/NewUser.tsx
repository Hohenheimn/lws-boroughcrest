import React, { useState, useEffect } from "react";
import { AiFillCamera } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { useForm } from "react-hook-form";

export default function NewUser() {
    const [userForm, setUserForm] = useState([true, false]);
    const [isLogoStatus, setLogoStatus] = useState("Upload Logo");
    const [isStatus, setStatus] = useState(true);

    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000000) {
            setLogoStatus("Image must be 2mb only");
            return;
        } else {
            setLogoStatus("");
            console.log(e.target.files[0]);
        }
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (["image/jpeg", "image/png"].includes(selectedImage.type)) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);
                ImageReader.addEventListener("load", (event: any) => {
                    setProfileUrl(event.target.result);
                });
                const file = e.target.files;
                setLogoStatus(file[0].name);
            } else {
                setLogoStatus("Invalid Image File");
            }
        } else {
            setLogoStatus("Nothing Happens");
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const Next = () => {
        setUserForm([false, true]);
    };

    return (
        <div className={style.container}>
            <section>
                <form
                    onSubmit={handleSubmit(Next)}
                    className={`${userForm[0] === true ? "" : "hidden"}`}
                >
                    <p className={style.modal_title}>Create User</p>
                    <h1 className={style.statusTitle}>
                        <span>STATUS</span>

                        <div
                            className={`statusCircle ${
                                isStatus ? "active" : "inactive"
                            }`}
                            onClick={() => setStatus(!isStatus)}
                        ></div>
                    </h1>

                    <ul className={`${style.ThreeRows} items-center`}>
                        <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <aside className="w-20 h-20 relative flex mr-4">
                                <aside className=" bg-white h-full w-full rounded-full object-cover shadow-lg relative">
                                    <Image
                                        src={isProfileUrl}
                                        alt=""
                                        layout="fill"
                                    />
                                </aside>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={DisplayImage}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image"
                                    className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[-10px] bottom-[-5px]"
                                >
                                    <AiFillCamera />
                                </label>
                            </aside>
                            <p className="text-[12px] mt-1">{isLogoStatus}</p>
                        </li>
                        <li className="  flex flex-col w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <label className=" text-[12px] font-semibold mb-1 w-[90%]">
                                *NAME
                            </label>
                            <input
                                type="text"
                                className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                            />
                        </li>
                        <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-end">
                            <label
                                className=" text-[12px] font-NHU-medium mb-1 uppercase cursor-pointer w-[90%] 480px:w-full"
                                htmlFor="file"
                            >
                                *Upload Signature
                            </label>
                            <input id="file" type="file" className="hidden" />
                        </li>
                    </ul>
                    <ul className={style.ThreeRows}>
                        <li>
                            <label>POSITION</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>EMPLOYEE ID</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>*DEPARTMENT</label>
                            <select name="" id="">
                                <option value=""></option>
                            </select>
                        </li>
                        <li>
                            <label>*EMAIL</label>
                            <input type="email" />
                        </li>

                        <li>
                            <label>*MOBILE</label>
                            <input type="number" placeholder="+63" />
                        </li>
                        <li>
                            <label>*CORPORATE</label>
                            <select name="" id="">
                                <option value=""></option>
                            </select>
                        </li>
                    </ul>
                    <div className={style.button_container}>
                        <Link href="">
                            <a className="button_cancel">CANCEL</a>
                        </Link>
                        <button className="buttonRed" type="submit">
                            NEXT
                        </button>
                    </div>
                </form>
                <NewRolesPermission
                    setUserForm={setUserForm}
                    userForm={userForm}
                />
            </section>
        </div>
    );
}

const NewRolesPermission = ({ setUserForm, userForm }: any) => {
    const [isTable, setTable] = useState([
        {
            id: 1,
            permissions: "",
            access: "",
            duration: "",
        },
    ]);
    const [isRole, setRole] = useState<string>("");
    const [isSave, setSave] = useState(false);
    return (
        <div className={`${userForm[1] === true ? "" : "hidden"}`}>
            <p className=" text-[16px] mb-3 font-bold">
                Create Roles & Permissions
            </p>
            <ul className=" flex mb-10 justify-between border-b-2 border-white flex-wrap 480px:mb-2 pb-4">
                <li className=" w-4/12 480px:w-full">
                    <p className="text-Themered text-[12px] font-semibold mb-1 uppercase">
                        ROLE
                    </p>
                    <select
                        name=""
                        id=""
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                    >
                        <option></option>
                        <option
                            value="admin staff"
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        >
                            Admin Staff
                        </option>
                        <option
                            value="finance"
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        >
                            Finance
                        </option>
                        <option
                            value="accounting"
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        >
                            Accounting
                        </option>
                    </select>
                </li>
            </ul>

            <table className="w-full mb-20">
                <thead>
                    <tr>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            PERMISSION
                        </th>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            ACCESS
                        </th>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            DURATION
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isTable.map((item, index) => (
                        <List
                            detail={item}
                            setTable={setTable}
                            key={index}
                            isTable={isTable}
                            index={index}
                        />
                    ))}
                </tbody>
            </table>

            <div className=" w-full flex justify-end items-center mb-10">
                <aside
                    className="cursor-pointer text-ThemeRed font-semibold text-[14px] mr-5"
                    onClick={() => setUserForm([true, false])}
                >
                    BACK
                </aside>

                <button className=" relative text-white flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5">
                    <div
                        className=" h-8 px-5 w-full flex justify-center items-center"
                        onClick={() => setSave(!isSave)}
                    >
                        SAVE <RiArrowDownSFill className=" ml-1 text-[24px]" />
                    </div>
                    {isSave && (
                        <ul className=" absolute top-full bg-white w-full">
                            <a
                                onClick={() => console.log(isTable)}
                                className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75"
                            >
                                SAVE
                            </a>

                            <Link href="/project/user?new">
                                <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                    SAVE & NEW
                                </a>
                            </Link>
                        </ul>
                    )}
                </button>
            </div>
        </div>
    );
};

type List = {
    detail: any;
    setTable: Function;
    isTable: {}[];
    index: number;
};
const List = ({ detail, setTable, isTable, index }: List) => {
    let newID: any;
    useEffect(() => {
        newID = Math.random();
    });

    const updateValue = (event: any, whatValue: string | undefined) => {
        const newItems = isTable.map((item: any) => {
            if (detail.id == item.id) {
                if (whatValue === "duration")
                    return { ...item, duration: event.target.value };
                if (whatValue === "permission")
                    return { ...item, permissions: event.target.value };
                if (whatValue === "access")
                    return { ...item, access: event.target.value };
            }
            return item;
        });
        setTable(newItems);
    };
    return (
        <tr>
            <td className=" pr-2">
                <select
                    name=""
                    id=""
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                    onChange={(e) => updateValue(e, "permission")}
                    value={detail.permissions}
                >
                    <option value=""></option>
                    <option
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        value="admin"
                    >
                        Admin
                    </option>
                    <option
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        value="Staff"
                    >
                        Staff
                    </option>
                </select>
            </td>
            <td className=" pr-2">
                <select
                    name=""
                    id=""
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                    onChange={(e) => updateValue(e, "access")}
                    value={detail.access}
                >
                    <option value=""></option>
                    <option
                        value="view"
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                    >
                        View
                    </option>
                    <option
                        value="access"
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                    >
                        Access
                    </option>
                </select>
            </td>
            <td className="  pr-2">
                <input
                    type="number"
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none relative after:absolute after:right-1 after:top-[50%] after:content-['Days'] after:translate-x-2/4"
                    value={detail.duration}
                    placeholder="Number of Days"
                    onChange={(e) => updateValue(e, "duration")}
                />
            </td>

            <td className=" flex justify-start">
                {isTable.length > 1 && (
                    <button
                        className=" text-[32px] text-ThemeRed mr-2"
                        onClick={() =>
                            setTable((item: any[]) =>
                                item.filter(
                                    (x: { id: any }) => x.id !== detail.id
                                )
                            )
                        }
                    >
                        -
                    </button>
                )}
                {isTable.length === index + 1 && (
                    <button
                        className=" text-[32px] text-ThemeRed"
                        onClick={() =>
                            setTable((item: any) => [
                                ...item,
                                {
                                    id: newID,
                                    permissions: "",
                                    access: "",
                                    duration: "",
                                },
                            ])
                        }
                    >
                        +
                    </button>
                )}
            </td>
        </tr>
    );
};
