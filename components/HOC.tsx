import React from "react";
import { getCookie } from "cookies-next";

export default function HOC() {
    const CheckToken = () => {
        console.log(getCookie("user"));
    };
    return CheckToken;
}

export const getServerSideProps = async (context: any) => {
    return {
        props: {}, // will be passed to the page component as props
    };
};
// Authentication token
// HIGHER ORDER COMPONENT
