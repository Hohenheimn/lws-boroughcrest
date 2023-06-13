import React, { useContext, useEffect, useState } from "react";
import { TextFieldValidation } from "../../Reusable/InputField";
import AppContext from "../../Context/AppContext";
import { PostPayload } from "../../../pages/admin/announcement";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import { CreateAnnouncement, ModifyAnnouncement } from "./Query";
import { ScaleLoader } from "react-spinners";
import PreviewPost from "./PreviewPost";
import { useRouter } from "next/router";

type Props = {
    isPost: PostPayload;
    setPost: Function;
    D_deusCheck: boolean;
    D_portalCheck: boolean;
};

export default function AnnoucementForm({
    isPost,
    setPost,
    D_deusCheck,
    D_portalCheck,
}: Props) {
    const router = useRouter();

    const { setPrompt } = useContext(AppContext);

    const [deusCheck, setDeusCheck] = useState(D_deusCheck);

    const [portalCheck, setPortalCheck] = useState(D_portalCheck);

    useEffect(() => {
        setDeusCheck(D_deusCheck);
        setPortalCheck(D_portalCheck);
    }, [D_portalCheck, D_deusCheck]);

    const checkBoxOnChange = (e: any, type: string) => {
        if (type === "deus") {
            setDeusCheck(e.target.checked);
        }
        if (type === "portal") {
            setPortalCheck(e.target.checked);
        }
    };
    const [isImageError, setImageError] = useState("");

    const DisplayImage = (e: any) => {
        let defaultUrl = "";
        if (e.target.files[0]?.size > 2000000) {
            // if (e.target.files[0]?.size > 100000) {
            setImageError("Photo must be 2mb only");
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

    const onSucces = () => {
        if (router.query.edit === undefined) {
            setPrompt({
                message: "Announcement successfully posted",
                type: "success",
                toggle: true,
            });
        } else {
            setPrompt({
                message: "Announcement successfully updated",
                type: "success",
                toggle: true,
            });
            router.push("");
        }
        setPost({
            title: "",
            description: "",
            photo_file: null,
            photo_url: "",
        });
        setDeusCheck(false);
        setPortalCheck(false);
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const id: any = router.query.edit;

    const { isLoading: CreateLoading, mutate: CreateMutate } =
        CreateAnnouncement(onSucces, onError);

    const { isLoading: ModifyLoading, mutate: ModifyMutate } =
        ModifyAnnouncement(onSucces, onError, id);

    const PostHandler = () => {
        if (isPost.title === "" || isPost.description === "") {
            setPrompt({
                message: "Fill out all field!",
                type: "draft",
                toggle: true,
            });
            return;
        }

        if (router.query.edit === undefined) {
            if (isPost.photo_file === null) {
                setPrompt({
                    message: "Please upload a photo",
                    type: "draft",
                    toggle: true,
                });
                return;
            }
        }

        if (deusCheck === false && portalCheck === false) {
            setPrompt({
                message: "Check where to Post!",
                type: "draft",
                toggle: true,
            });
            return;
        }

        let Payload: any = {
            title: isPost.title,
            description: isPost.description,
            image_photo: isPost.photo_file === null ? "" : isPost.photo_file,
            deus_dashboard: deusCheck,
            portal_dashboard: portalCheck,
        };

        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(Payload);
        keys.forEach((key) => {
            arrayData.push({
                key: key,
                keyData: Payload[key],
            });
        });

        arrayData.map(({ key, keyData }: any) => {
            formData.append(key, keyData);
        });

        if (router.query.edit !== undefined) {
            ModifyMutate(formData);
        } else {
            CreateMutate(formData);
        }
    };
    return (
        <div>
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
            <h3 className="text-ThemeRed 1366px:text-[14px]">DESCRIPTION</h3>
            <textarea
                className="field w-full mb-5"
                value={isPost.description}
                onChange={(e) => {
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
                    Note: Image should be 400x180px and max of 2mb
                    <span className="text-ThemeRed font-NHU-bold">
                        {isImageError}
                    </span>
                </p>
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={deusCheck}
                            onChange={(e) => checkBoxOnChange(e, "deus")}
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
                            onChange={(e) => checkBoxOnChange(e, "portal")}
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
                {CreateLoading || ModifyLoading ? (
                    <ScaleLoader color="#fff" height="10px" width="2px" />
                ) : router.query.edit === undefined ? (
                    "POST"
                ) : (
                    "UPDATE POST"
                )}
            </button>

            <section className="mt-10 1366px:mt-5">
                <h1 className="text-ThemeRed mb-5">POST PREVIEW</h1>
                <PreviewPost Post={isPost} date={"Today"} />
            </section>
        </div>
    );
}
