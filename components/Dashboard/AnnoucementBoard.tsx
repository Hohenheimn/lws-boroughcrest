import React from "react";
import PostComponent from "../ADMIN/Announcement/PostComponent";

export default function AnnoucementBoard() {
    return (
        <>
            <PostComponent
                type={"dashboard"}
                Post={{
                    id: 0,
                    title: "",
                    description: "",
                    image_photo: "",
                    deus_dashboard: 0,
                    portal_dashboard: 0,
                    created_at: "",
                }}
                DeleteHandler={function (id: number): void {
                    throw new Error("Function not implemented.");
                }}
            />
            <PostComponent
                type={"dashboard"}
                Post={{
                    id: 0,
                    title: "",
                    description: "",
                    image_photo: "",
                    deus_dashboard: 0,
                    portal_dashboard: 0,
                    created_at: "",
                }}
                DeleteHandler={function (id: number): void {
                    throw new Error("Function not implemented.");
                }}
            />
        </>
    );
}
