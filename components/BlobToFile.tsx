export const BlobToFile = (Blob: any, Name: any, Type: any) => {
    var file = new File([Blob], Name, { type: Type });
    return file;
};
