import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type Props = {
    setTextOS: Function;
    isTextOS: string;
};

export default function Wysiwyg({ setTextOS, isTextOS }: Props) {
    const [isText, setText] = useState("");

    useEffect(() => {
        setTextOS(isText);
    }, [isText]);

    useEffect(() => {
        setText(isTextOS);
    }, [isTextOS]);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "direction",
        "align",
        "code-block",
    ];
    return (
        <div>
            <ReactQuill
                theme="snow"
                value={isText}
                onChange={setText}
                formats={formats}
                modules={modules}
            />
        </div>
    );
}
