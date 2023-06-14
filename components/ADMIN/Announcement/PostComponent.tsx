import React, { useState } from "react";
import Image from "next/image";
import { PostDetail } from "../../../pages/admin/announcement";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FormattedDate } from "./FormatDate";
import { useRouter } from "next/router";
import { AccessActionValidation } from "../../Reusable/PermissionValidation/ActionAccessValidation";

type Props = {
    Post: PostDetail;
    type: string;
    DeleteHandler: (id: number) => void;
};

export default function PostComponent({ Post, type, DeleteHandler }: Props) {
    const router = useRouter();

    const [toggleMenu, setToggleMenu] = useState(false);

    const [toggleSeeMore, setSeeMore] = useState(false);

    const Image_Photo =
        Post.image_photo === null
            ? "/Images/sample_coming.png"
            : "https://boroughcrest-api.lws.codes/get-img?image=" +
              Post.image_photo;

    const Permission_modify = AccessActionValidation("Announcement", "modify");

    return (
        <div>
            {type === "dashboard" && (
                <h1 className="mb-2">{Post.created_at}</h1>
            )}
            <article
                className={` ${
                    (type === "preview" || type === "dashboard") &&
                    "border border-ThemeRed mb-5"
                } p-5 1366px:p-3 rounded-lg `}
            >
                {type === "posted" ? (
                    <div className="relative pr-8">
                        <h4 className="mb-2  1366px:text-[14px]">
                            {Post.title}
                        </h4>
                        <div className=" absolute top-0 right-0">
                            <BiDotsHorizontalRounded
                                onClick={() => setToggleMenu(!toggleMenu)}
                                className=" cursor-pointer text-[30px] mt-[-5px] text-ThemeRed"
                            />
                            {toggleMenu && Permission_modify && (
                                <ul className=" overflow-hidden absolute top-full right-0 bg-white shadow-lg rounded-md">
                                    <li
                                        onClick={() => {
                                            router.push(`?edit=${Post.id}`);
                                            setToggleMenu(false);
                                        }}
                                        className=" cursor-pointer text-[14px] text-center py-1 px-2 text-ThemeRed hover:text-white hover:bg-ThemeRed"
                                    >
                                        Edit
                                    </li>
                                    <li
                                        onClick={() => DeleteHandler(Post.id)}
                                        className=" cursor-pointer text-[14px] text-center py-1 px-2 text-ThemeRed hover:text-white hover:bg-ThemeRed"
                                    >
                                        Delete
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                ) : (
                    <h4 className="mb-2  1366px:text-[14px]">{Post.title}</h4>
                )}
                <p
                    className={`mb-2  1366px:text-[12px] text-RegularColor text-[14px] ${
                        !toggleSeeMore && "card_preview"
                    }`}
                >
                    {Post.description}
                </p>
                {Post.description !== null && (
                    <h5
                        className="italic text-ThemeRed mb-2 text-[14px] hover:underline cursor-pointer"
                        onClick={() => setSeeMore(!toggleSeeMore)}
                    >
                        See {toggleSeeMore ? "less" : "more"}...
                    </h5>
                )}
                {Post.image_photo !== null && (
                    <div className="relative w-full aspect-[1.5/1]">
                        <Image
                            src={Image_Photo}
                            layout="fill"
                            objectFit="contain"
                            alt=""
                        />
                    </div>
                )}

                {type !== "dashboard" && (
                    <p className=" text-RegularColor text-[14px] mt-1">
                        {Post.created_at}
                    </p>
                )}
            </article>
        </div>
    );
}
