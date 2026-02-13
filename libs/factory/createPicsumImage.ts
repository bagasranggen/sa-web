export const createPicsumImage = ({
    id = 239,
    width = 600,
    height = 450,
    alt,
}: { alt?: string } & Partial<Record<'id' | 'width' | 'height', number>>) => {
    return {
        src: `https://picsum.photos/id/${id}/${width}/${height}`,
        width,
        height,
        alt: alt ?? `image ${id}`,
    };
};
