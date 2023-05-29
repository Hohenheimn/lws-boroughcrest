import React, { useState } from "react";
import Image from "next/image";
import { Post } from "../../../pages/admin/announcement";

type Props = {
    Post: Post;
    type: string;
};

export default function PostComponent({ Post, type }: Props) {
    const [toggleSeeMore, setSeeMore] = useState(false);
    return (
        <article
            className={` ${
                type === "preview" && "border border-ThemeRed mb-5"
            } p-5 1366px:p-3 rounded-lg `}
        >
            <h4 className="mb-2  1366px:text-[14px]">{Post.title}</h4>
            <p
                className={`mb-2  1366px:text-[12px] text-RegularColor text-[14px] ${
                    !toggleSeeMore && "card_preview"
                }`}
            >
                {Post.description}
            </p>
            <h5
                className="italic text-ThemeRed mb-2 text-[14px] hover:underline cursor-pointer"
                onClick={() => setSeeMore(!toggleSeeMore)}
            >
                See {toggleSeeMore ? "less" : "more"}...
            </h5>
            <div className="relative w-full aspect-[2/1]">
                <Image src={Post.photo_url} layout="fill" objectFit="cover" />
            </div>
            <p className=" text-RegularColor text-[14px]">Today . 08:30 AM</p>
        </article>
    );
}
