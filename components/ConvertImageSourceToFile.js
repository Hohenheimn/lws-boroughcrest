export const ConvertSourceToImage = (name, path) => {
    const url = path;
    const fileName = name;

    fetch(url).then(async (response) => {
        let contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], fileName, { contentType });
        console.log(file);
        // access file here
    });
};
