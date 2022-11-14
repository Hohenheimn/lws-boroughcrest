type Props = {
    setImgError: any;
    imgError: any;
    setProfileUrl: any;
    setSignature: any;
    setValidIDUrl: any;
    e: any;
};

const ImageVerication = ({
    e,
    setImgError,
    imgError,
    setProfileUrl,
    setSignature,
    setValidIDUrl,
}: Props) => {
    if (e.target.files[0]?.size > 2000000) {
        if (e.target.getAttribute("data-type") === "profile") {
            setImgError({
                ...imgError,
                img1: "Image must be 2mb only",
            });
        }
        if (e.target.getAttribute("data-type") === "validID") {
            setImgError({
                ...imgError,
                img2: "Image must be 2mb only",
            });
        }
        if (e.target.getAttribute("data-type") === "signature") {
            setImgError({
                ...imgError,
                img3: "Image must be 2mb only",
            });
        }
        return;
    }
    if (e.target.files.length > 0) {
        let selectedImage = e.target.files[0];
        if (
            ["image/jpeg", "image/png", "image/svg+xml"].includes(
                selectedImage.type
            )
        ) {
            let ImageReader = new FileReader();
            ImageReader.readAsDataURL(selectedImage);

            ImageReader.addEventListener("load", (event: any) => {
                if (e.target.getAttribute("data-type") === "profile") {
                    setProfileUrl(event.target.result);
                    setImgError({
                        ...imgError,
                        img1: "",
                    });
                }
                if (e.target.getAttribute("data-type") === "validID") {
                    setValidIDUrl(event.target.result);
                    setImgError({
                        ...imgError,
                        img2: "",
                    });
                }
                if (e.target.getAttribute("data-type") === "signature") {
                    setSignature(true);
                    setImgError({
                        ...imgError,
                        img3: "",
                    });
                }
            });
        } else {
            if (e.target.getAttribute("data-type") === "profile") {
                setProfileUrl("/Images/sampleProfile.png");
                setImgError({
                    ...imgError,
                    img1: "Invalid Image File",
                });
            }
            if (e.target.getAttribute("data-type") === "validID") {
                setValidIDUrl("/Images/id-sample.png");
                setImgError({
                    ...imgError,
                    img2: "Invalid Image File",
                });
            }
            if (e.target.getAttribute("data-type") === "signature") {
                setImgError({
                    ...imgError,
                    img3: "Invalid Image File",
                });
                setSignature(false);
            }
        }
    } else {
        if (e.target.getAttribute("data-type") === "profile") {
            setProfileUrl("/Images/sampleProfile.png");
            setImgError({
                ...imgError,
                img1: "Image file removed",
            });
        }
        if (e.target.getAttribute("data-type") === "validID") {
            setValidIDUrl("/Images/id-sample.png");
            setImgError({
                ...imgError,
                img2: "Image file removed",
            });
        }
        if (e.target.getAttribute("data-type") === "signature") {
            setImgError({
                ...imgError,
                img3: "Image file removed",
            });
            setSignature(false);
        }
    }
};

export default ImageVerication;
