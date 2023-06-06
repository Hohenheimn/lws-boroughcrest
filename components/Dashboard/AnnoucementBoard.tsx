import React from "react";
import PostComponent from "../FINANCE/Annoucement/PostComponent";

export default function AnnoucementBoard() {
    return (
        <>
            <PostComponent
                Post={{
                    title: "Lorem ipsum dolor sit amet consectetur",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis quam fuga qui blanditiis error perferendis consequuntur provident dolor non repudiandae labore rerum facere ipsa neque modi molestiae, itaque corrupti maiores.",
                    photo_file: null,
                    photo_url: "/Images/sample_coming.png",
                }}
                type={"dashboard"}
                date="Today"
            />
            <PostComponent
                Post={{
                    title: "Lorem ipsum dolor sit amet consectetur",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis quam fuga qui blanditiis error perferendis consequuntur provident dolor non repudiandae labore rerum facere ipsa neque modi molestiae, itaque corrupti maiores.",
                    photo_file: null,
                    photo_url: "/Images/sample_coming.png",
                }}
                type={"dashboard"}
                date="Yesterday"
            />
        </>
    );
}
