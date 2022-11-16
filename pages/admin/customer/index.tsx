import React, { useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";
import NewCustomer from "../../../components/ADMIN/Customer/NewCustomer";
import { useRouter } from "next/router";
import { GetImage } from "../../../components/ReactQuery/CustomerMethod";
import { BlobToFile } from "../../../components/BlobToFile";
import api from "../../../util/api";
import UpdateDraft from "../../../components/ADMIN/Customer/UpdateDraft";

export default function Customer({ Draft }: any) {
    const router = useRouter();
    const { setSearchBar, cusToggle } = useContext(AppContext);
    // Process Draft Data
    if (Draft) {
        const DraftVal = Draft?.values;
        const { data: imgPhoto, isLoading: isLoading1 } = GetImage(
            DraftVal?.image_photo,
            DraftVal?.image_photo
        );
        const { data: imgValid, isLoading: isLoading2 } = GetImage(
            DraftVal?.image_valid_id,
            DraftVal?.image_photo
        );
        const { data: imgSignature, isLoading: isLoading3 } = GetImage(
            DraftVal?.image_signature,
            DraftVal?.image_valid_id
        );

        if (!isLoading1 || !isLoading2 || isLoading3) {
            // Convert Blob to File
            const imgPathname0 = DraftVal.image_photo.split("/");
            const image_name0 = imgPathname0[imgPathname0.length - 1];
            var file = BlobToFile(imgPhoto?.data, image_name0, "image/png");

            const imgPathname1 = DraftVal.image_valid_id.split("/");
            const image_name1 = imgPathname1[imgPathname1.length - 1];
            var file1 = BlobToFile(imgValid?.data, image_name1, "image/png");

            const imgPathname2 = DraftVal.image_signature.split("/");
            const image_name2 = imgPathname2[imgPathname2.length - 1];
            var file2 = BlobToFile(
                imgSignature?.data,
                image_name2,
                "image/png"
            );

            // DraftImageFile = {
            //     ...DraftImageFile,
            //     profile_file: file,
            //     valid_file: file1,
            //     signature: file2,
            // };
        }
    }

    return (
        <>
            <SearchFilter page="customer" setSearchTable={setSearchBar} />
            <CustomerTable />

            {cusToggle && <NewCustomer />}
            {router.query.draft !== undefined && <UpdateDraft />}
        </>
    );
}

export const getServerSideProps = async (context: any) => {
    const id = context.query.id;
    const cookiesName: any = context.req.headers.cookie;
    const cookieArray = cookiesName.split("=");
    let cookie = cookieArray[cookieArray.length - 1];
    cookie = cookie.replace("%7C", "|");
    let DraftVal: any;

    try {
        const { data } = await api.get(`/admin/customer/draft`, {
            headers: {
                Authorization: `Bearer ${cookie}`,
            },
        });
        DraftVal = false;
        // DraftVal = data;
        return {
            props: {
                Draft: DraftVal,
            },
        };
    } catch {
        DraftVal = false;
        return {
            props: {
                Draft: DraftVal,
            },
        };
    }
};
