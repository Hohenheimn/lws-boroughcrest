import React, { useEffect, useState } from "react";
import AnnoucementForm from "./AnnoucementForm";
import { PostDetail, PostPayload } from "../../../pages/admin/announcement";
import { BeatLoader } from "react-spinners";
import { ShowAnnoucement } from "./Query";
import { useRouter } from "next/router";

export default function AnnouncementModify() {
    const router = useRouter();

    const id: any = router.query.edit;

    const { data, isLoading, isError } = ShowAnnoucement(id);

    const AnnDetail: PostDetail = data?.data;

    const [isPost, setPost] = useState<PostPayload>({
        title: "",
        description: "",
        photo_file: null,
        photo_url: "",
    });

    const [deusCheck, setDeusCheck] = useState(false);

    const [portalCheck, setPortalCheck] = useState(false);

    const Image_Photo =
        data?.data.image_photo === null
            ? ""
            : "https://boroughcrest-api.lws.codes/get-img?image=" +
              data?.data.image_photo;

    useEffect(() => {
        if (data?.data !== undefined) {
            setPost({
                title: AnnDetail.title,
                description: AnnDetail.description,
                photo_file: null,
                photo_url: Image_Photo,
            });
            setDeusCheck(AnnDetail.deus_dashboard === 1 ? true : false);
            setPortalCheck(AnnDetail.portal_dashboard === 1 ? true : false);
        }
    }, [data?.data]);

    if (isLoading) {
        return (
            <div className=" flex justify-center items-center py-10 w-full">
                <BeatLoader size={30} color="#8f384d" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className=" flex justify-center items-center py-10 w-full">
                <h1>Something went wrong</h1>
            </div>
        );
    }
    return (
        <AnnoucementForm
            isPost={isPost}
            setPost={setPost}
            D_deusCheck={deusCheck}
            D_portalCheck={portalCheck}
        />
    );
}
