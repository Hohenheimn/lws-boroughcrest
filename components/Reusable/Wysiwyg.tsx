import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

export default function Wysiwyg() {
    const [isText, setText] = useState<any>();

    return (
        <div className="wysiwyg">
            <Editor
                editorState={isText}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setText}
            />
        </div>
    );
}
