import React from 'react';
import { getImageProps, ImageProps } from 'next/image';

import { joinArrayString } from '@/libs/utils';

import { BaseItemProps } from '@/components/common/Picture';

export type PictureSourceProps = BaseItemProps;

const PictureSource = ({ media: mediaProps, ...item }: PictureSourceProps): React.ReactElement => {
    let media: string | undefined = undefined;
    if (mediaProps) media = `(min-width: ${mediaProps}px)`;

    let sizesProps: ImageProps['sizes'] = undefined;
    if (media && item?.sizes) sizesProps = joinArrayString([media, item.sizes], ' ');

    const {
        props: { srcSet, width, height, sizes },
    } = getImageProps({
        src: item?.src,
        width: item?.width,
        height: item?.height,
        alt: item?.alt,
        sizes: sizesProps,
    });

    const props: React.SourceHTMLAttributes<HTMLSourceElement> = {
        srcSet,
        width,
        height,
        sizes,
        media,
    };

    return <source {...props} />;
};

export default PictureSource;
