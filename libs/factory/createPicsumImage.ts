export type CreatePicsumImageProps = {
    alt?: string;
    media?: number;
} & Partial<Record<'id' | 'width' | 'height', number>>;

export const createPicsumImage = ({ id = 239, width = 600, height = 450, alt, media }: CreatePicsumImageProps) => {
    return {
        src: `https://picsum.photos/id/${id}/${width}/${height}`,
        width,
        height,
        alt: alt ?? `image ${id}`,
        ...(media ? { media } : {}),
    };
};
