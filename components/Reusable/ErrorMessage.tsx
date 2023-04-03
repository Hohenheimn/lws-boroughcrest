import { useContext } from "react";
import AppContext from "../Context/AppContext";

export const ErrorSubmit = (e: any, setPrompt: Function) => {
    const propertyValues = Object.values(e.response.data);
    const message = propertyValues.map((item: any, index) => {
        return propertyValues.length - 1 === index
            ? item
            : item.replace(".", "") + ", ";
    });
    if (e.response.status === 422) {
        setPrompt({
            message: message,
            type: "error",
            toggle: true,
        });
        console.log("bts");
    } else {
        setPrompt({
            message: "Something went wrong",
            type: "error",
            toggle: true,
        });
    }
};
