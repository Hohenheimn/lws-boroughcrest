import React, { useState } from "react";
import Image from "next/image";
import { PostPayload } from "../../../pages/admin/announcement";

type Props = {
    Post: PostPayload;
    date: string;
};

export default function PreviewPost({ Post, date }: Props) {
    const [toggleSeeMore, setSeeMore] = useState(false);
    return (
        <div>
            <h1 className="mb-1">{date}</h1>
            <article
                className={` border border-ThemeRed mb-5 p-5 1366px:p-3 rounded-lg `}
            >
                <h4 className="mb-2  1366px:text-[14px]">{Post.title}</h4>
                <p
                    className={`mb-2  1366px:text-[12px] text-RegularColor text-[14px] ${
                        !toggleSeeMore && "card_preview"
                    }`}
                >
                    {Post.description}
                </p>
                {Post.description !== "" && (
                    <h5
                        className="italic text-ThemeRed mb-2 text-[14px] hover:underline cursor-pointer"
                        onClick={() => setSeeMore(!toggleSeeMore)}
                    >
                        See {toggleSeeMore ? "less" : "more"}...
                    </h5>
                )}
                {Post.photo_url !== "" && (
                    <div className="relative w-full aspect-[1.5/1]">
                        <Image
                            src={Post.photo_url}
                            layout="fill"
                            objectFit="cover"
                            alt=""
                        />
                    </div>
                )}
            </article>
        </div>
    );
}
