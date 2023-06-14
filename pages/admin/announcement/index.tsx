import React, { useContext, useState } from "react";
import Image from "next/image";
import PostReview from "../../../components/ADMIN/Announcement/PostComponent";
import AnnoucementForm from "../../../components/ADMIN/Announcement/AnnoucementForm";
import AnnouncementList from "../../../components/ADMIN/Announcement/AnnouncementList";
import { useRouter } from "next/router";
import AnnouncementModify from "../../../components/ADMIN/Announcement/AnnouncementModify";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { AccessActionValidation } from "../../../components/Reusable/PermissionValidation/ActionAccessValidation";

export type PostDetail = {
    id: number;
    title: string;
    description: string;
    image_photo: string;
    deus_dashboard: number;
    portal_dashboard: number;
    created_at: string;
};

export type PostPayload = {
    title: string;
    description: string;
    photo_file: null | File;
    photo_url: string;
};

export default function Index() {
    const router = useRouter();

    const [isPost, setPost] = useState<PostPayload>({
        title: "",
        description: "",
        photo_file: null,
        photo_url: "",
    });

    const PagePermisson = PageAccessValidation("Announcement");

    const Permission_create = AccessActionValidation("Announcement", "create");

    const Permission_modify = AccessActionValidation("Announcement", "modify");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <div>
            <h1 className="pageTitle">Announcement</h1>
            <ul className="flex flex-wrap">
                <li className="w-2/4  pr-10 820px:pr-5 640px:w-full 640px:p-0 640px:mb-10 640px:border-b 640px:border-ThemeRed 640px:pb-5">
                    {router.query.edit !== undefined ? (
                        <>{Permission_modify && <AnnouncementModify />}</>
                    ) : (
                        <>
                            {Permission_create && (
                                <AnnoucementForm
                                    isPost={isPost}
                                    setPost={setPost}
                                    D_deusCheck={false}
                                    D_portalCheck={false}
                                />
                            )}
                        </>
                    )}
                </li>
                <li className=" w-2/4 pl-5 820px:pl-2 640px:w-full 640px:p-0 640px:border-none border-l border-ThemeRed50">
                    <h1 className="text-ThemeRed text-[20px] mb-5">Posted</h1>
                    <div className="max-h-[90vh] overflow-auto">
                        <AnnouncementList type="posted" />
                    </div>
                </li>
            </ul>
        </div>
    );
}
