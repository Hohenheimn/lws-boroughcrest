import React, { useContext, useState } from "react";
import { BeatLoader, ScaleLoader } from "react-spinners";
import { DeleteAnnouncement, GetAnnouncement } from "./Query";
import PostComponent from "./PostComponent";
import { PostDetail } from "../../../pages/admin/announcement";
import AppContext from "../../Context/AppContext";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import ModalTemp from "../../Reusable/ModalTemp";

type Props = {
    type: string;
};

export default function AnnouncementList({ type }: Props) {
    const { setPrompt } = useContext(AppContext);

    const [isPaginate, setPaginate] = useState(3);

    const { data, isLoading, isError } = GetAnnouncement(
        type === "dashboard" ? "deus" : "",
        isPaginate
    );

    const onSucces = () => {
        setPrompt({
            message: "Announcement successfully deleted",
            type: "success",
            toggle: true,
        });
        setConfirmDeleteID(null);
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { mutate: deleteMutate, isLoading: deleteLoading } =
        DeleteAnnouncement(onSucces, onError);

    const [isConfirmDeleteID, setConfirmDeleteID] = useState<null | number>(
        null
    );

    const DeleteHandlerModal = (id: number) => {
        setConfirmDeleteID(id);
    };

    const DeleteHandlerProceed = () => {
        deleteMutate(isConfirmDeleteID);
    };

    if (data?.data === "") {
        return (
            <div>
                <div className="flex justify-center my-10">
                    <h1>No permission to view</h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            {isConfirmDeleteID !== null && (
                <ModalTemp narrow={true}>
                    <h1 className=" text-center mb-5">
                        Are you sure you want to delete this announcement?
                    </h1>
                    <div className="flex w-full justify-between">
                        <button
                            onClick={() => setConfirmDeleteID(null)}
                            className=" button_cancel"
                        >
                            NO
                        </button>
                        <button
                            onClick={DeleteHandlerProceed}
                            className=" buttonRed"
                        >
                            {deleteLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "YES"
                            )}
                        </button>
                    </div>
                </ModalTemp>
            )}
            {isLoading && (
                <div className="flex justify-center my-10">
                    <BeatLoader color={"#8f384d"} />
                </div>
            )}
            {isError && (
                <div className="flex justify-center my-10">
                    <h1>Something went wrong</h1>
                </div>
            )}
            <div className="h-full">
                {data?.data?.data.map((item: PostDetail, index: number) => (
                    <PostComponent
                        key={index}
                        Post={item}
                        type={type}
                        DeleteHandler={DeleteHandlerModal}
                    />
                ))}
                {data?.data.data.length <= 0 && (
                    <h1 className="text-center py-10">No Announcement Found</h1>
                )}
            </div>

            {Number(isPaginate) === Number(data?.data.data.length) && (
                <div className=" flex justify-center">
                    <button
                        className=" text-ThemeRed hover:underline text-[14px] mt-2"
                        onClick={() => setPaginate((prev) => Number(prev) + 3)}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
