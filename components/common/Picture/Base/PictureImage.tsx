import React from 'react';
import { getImageProps } from 'next/image';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import { BaseItemProps } from '@/components/common/Picture/Base';

export type PictureImageProps = BaseItemProps;

const PictureImage = ({ className: classNameProps, ...item }: PictureImageProps): React.ReactElement => {
    let imageClass: ArrayStringProps = [];
    if (classNameProps) imageClass.push(classNameProps);
    imageClass = joinArrayString(imageClass);

    const {
        props: { src, srcSet, width, height, alt, className, loading },
    } = getImageProps({
        src: item?.src,
        className: imageClass,
        width: item?.width,
        height: item?.height,
        loading: item?.loading,
        alt: item?.alt,
    });

    const imgProps: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> = {
        src,
        srcSet,
        width,
        height,
        loading,
        ...(className ? { className } : {}),
    };

    return (
        <img
            {...imgProps}
            alt={alt}
        />
    );
};

export default PictureImage;
