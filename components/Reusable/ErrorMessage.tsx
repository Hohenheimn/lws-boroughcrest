export const ErrorSubmit = (e: any, setPrompt: Function) => {
    const clientError = [400, 401, 403, 404, 409];
    if (e !== undefined) {
        const propertyValues = Object.values(e.response.data);
        if (
            e.response.status === 422 ||
            clientError.includes(e.response.status)
        ) {
            const message = propertyValues.map((item: any, index) => {
                return propertyValues.length - 1 === index
                    ? item
                    : item.replaceAll(".", "") + ", ";
            });
            setPrompt({
                message: message,
                type: "error",
                toggle: true,
            });
            return;
        }
    }

    setPrompt({
        message: "Something went wrong",
        type: "error",
        toggle: true,
    });
    return;
};
