export const DynamicImport = (e: any, setPrompt: Function, Mutate: any) => {
    if (e.target.files.length > 0) {
        const fileArray = e.target.files[0].name.split(".");
        const extension = fileArray[fileArray.length - 1];
        if (extension === "xlsx") {
            let selectedFile = e.target.files[0];
            const formData = new FormData();
            formData.append("file", selectedFile);

            Mutate(formData);
        } else {
            setPrompt({
                type: "error",
                message: "Invalid file, must be XLSX only!",
                toggle: true,
            });
        }
    }
};
