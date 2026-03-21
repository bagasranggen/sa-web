export const createPictureItem = ({ item, media }: any) => {
    let data = undefined;

    if (item) data = Object.assign(data ?? {}, item);
    if (media) data = Object.assign(data ?? {}, { media });

    return data;
};
