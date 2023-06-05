import React, { useContext, useState } from "react";
import Image from "next/image";
import PostReview from "../../../components/FINANCE/Annoucement/PostComponent";
import PostComponent from "../../../components/FINANCE/Annoucement/PostComponent";
import { TextFieldValidation } from "../../../components/Reusable/InputField";
import AppContext from "../../../components/Context/AppContext";

export type Post = {
    title: string;
    description: string;
    photo_file: null | File;
    photo_url: string;
};

export default function Index() {
    const { setPrompt } = useContext(AppContext);

    const [deusCheck, setDeusCheck] = useState(false);

    const [portalCheck, setPortalCheck] = useState(false);

    const checkBoxOnChange = (e: any, type: string) => {
        if (type === "deus") {
            setDeusCheck(e.target.checked);
        }
        if (type === "portal") {
            setPortalCheck(e.target.checked);
        }
    };

    const [isPost, setPost] = useState<Post>({
        title: "",
        description: "",
        photo_file: null,
        photo_url: "/Images/sample_coming.png",
    });

    const samplePosted = {
        title: "Sample Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus repellendus tenetur veritatis dolorum quos quia iusto soluta, dolor voluptatem odio qui iste, voluptates modi ab! Ab voluptatibus numquam molestiae quae!",
        photo_file: null,
        photo_url: "/Images/sample_coming.png",
    };

    const [isImageError, setImageError] = useState("");

    const DisplayImage = (e: any) => {
        let defaultUrl = "/Images/sample_coming.png";
        if (e.target.files[0]?.size > 100000) {
            setImageError("Photo must be 100kb only");
            setPost({
                ...isPost,
                photo_file: null,
                photo_url: defaultUrl,
            });
            return;
        }
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (
                ["image/jpeg", "image/png", "image/svg+xml"].includes(
                    selectedImage.type
                )
            ) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);
                ImageReader.addEventListener("load", (event: any) => {
                    setImageError("");

                    setPost({
                        ...isPost,
                        photo_file: e.target.files[0],
                        photo_url: event.target.result,
                    });
                });
            } else {
                setImageError("Invalid Image File");
                setPost({
                    ...isPost,
                    photo_file: null,
                    photo_url: defaultUrl,
                });
            }
        } else {
            setImageError("Image file removed");
            setPost({
                ...isPost,
                photo_file: null,
                photo_url: defaultUrl,
            });
        }
    };

    const PostHandler = () => {
        if (
            isPost.title === "" ||
            isPost.description === "" ||
            isPost.photo_file === null
        ) {
            setPrompt({
                message: "Fill out all field!",
                type: "draft",
                toggle: true,
            });
            return;
        }
        if (deusCheck === false && portalCheck === false) {
            setPrompt({
                message: "Check where to Post!",
                type: "draft",
                toggle: true,
            });
        }
        console.log(isPost);
        console.log(deusCheck);
        console.log(portalCheck);
    };

    return (
        <div>
            <h1 className="pageTitle">Announcement</h1>
            <ul className="flex flex-wrap">
                <li className="w-2/4  pr-10 820px:pr-5 640px:w-full 640px:p-0 640px:mb-10 640px:border-b 640px:border-ThemeRed 640px:pb-5">
                    <h3 className=" text-ThemeRed 1366px:text-[14px]">TITLE</h3>
                    <input
                        type="text"
                        className="field w-full mb-5"
                        value={isPost.title}
                        onChange={(e) => {
                            if (!TextFieldValidation(e, 255)) return;
                            setPost({ ...isPost, title: e.target.value });
                        }}
                    />
                    <h3 className="text-ThemeRed 1366px:text-[14px]">
                        DESCRIPTION
                    </h3>
                    <textarea
                        className="field w-full mb-5"
                        value={isPost.description}
                        onChange={(e) => {
                            if (!TextFieldValidation(e, 1000)) return;
                            setPost({ ...isPost, description: e.target.value });
                        }}
                    ></textarea>
                    <div className="w-full mb-2">
                        <label
                            htmlFor="upload_photo"
                            className="w-full inline-block text-center rounded-md bg-white shadow-md text-ThemeRed  1366px:text-[14px] p-2"
                        >
                            + UPLOAD PHOTO
                        </label>
                        <input
                            type="file"
                            id="upload_photo"
                            className="z-[-1] opacity-0 absolute"
                            onChange={(e) => DisplayImage(e)}
                        />
                    </div>
                    <div className="flex justify-between 1366px:flex-col mb-5">
                        <p className="text-gray-400 italic text-[14px] flex flex-col">
                            Note: Image should be 400x180px and max of 100kb
                            <span className="text-ThemeRed font-NHU-bold">
                                {isImageError}
                            </span>
                        </p>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={deusCheck}
                                    onChange={(e) =>
                                        checkBoxOnChange(e, "deus")
                                    }
                                    id="deus"
                                />
                                <label
                                    htmlFor="deus"
                                    className=" text-RegularColor text-[14px] 1366px:text-[12px]"
                                >
                                    Deus Dashboard
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="portal"
                                    checked={portalCheck}
                                    onChange={(e) =>
                                        checkBoxOnChange(e, "portal")
                                    }
                                />
                                <label
                                    htmlFor="portal"
                                    className=" text-RegularColor text-[14px] 1366px:text-[12px]"
                                >
                                    Portal Dashboard
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        className="w-full inline-block text-center rounded-md text-white shadow-md bg-ThemeRed p-2"
                        onClick={PostHandler}
                    >
                        POST
                    </button>

                    <section className="mt-10 1366px:mt-5">
                        <h1 className="text-ThemeRed mb-5">POST REVIEW</h1>
                        <PostComponent
                            Post={isPost}
                            type="preview"
                            date={"Today"}
                        />
                    </section>
                </li>
                <li className=" w-2/4 pl-5 820px:pl-2 640px:w-full 640px:p-0 640px:border-none border-l border-ThemeRed50">
                    <h1 className="text-ThemeRed text-[20px] mb-5">Posted</h1>
                    <div className="max-h-[90vh] overflow-auto">
                        <PostComponent
                            Post={samplePosted}
                            type="posted"
                            date={"Today"}
                        />
                        <PostComponent
                            Post={samplePosted}
                            type="posted"
                            date={"Yesterday"}
                        />
                        <PostComponent
                            Post={samplePosted}
                            type="posted"
                            date={"Mar 03 1998"}
                        />
                    </div>
                </li>
            </ul>
        </div>
    );
}
