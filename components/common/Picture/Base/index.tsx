import React, { forwardRef } from 'react';
import { ImageProps } from 'next/image';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import PictureSource from '@/components/common/Picture/Base/PictureSource';
import PictureImage from '@/components/common/Picture/Base/PictureImage';

export type BaseItemProps = {
    media?: number;
    srcRetina?: string;
    type?: string;
} & ImageProps;

export type BaseProps = {
    className?: ClassnameProps['className'];
    imageClassName?: ClassnameProps['className'];
    style?: React.CSSProperties;
    items: BaseItemProps[];
} & (React.DOMAttributes<HTMLPictureElement> & Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'>);

const Base = forwardRef<HTMLPictureElement, BaseProps>(
    ({ className, imageClassName, items, style, loading, ...props }, ref) => {
        if (!items || items.length === 0) return null;

        let pictureClass: ArrayStringProps = [];
        if (className) pictureClass.push(className);
        pictureClass = joinArrayString(pictureClass);

        let pictureProps = props;
        if (style) pictureProps = Object.assign(pictureProps, { style });

        return (
            <picture
                ref={ref}
                {...(pictureClass ? { className: pictureClass } : {})}
                {...pictureProps}>
                {items.map((item, i) => {
                    const isLast = items.length - 1 === i;

                    const Image = isLast ? PictureImage : PictureSource;
                    const { alt, title, className, ...restItem } = item as any;

                    let imgClass: ArrayStringProps = className ? [className] : [];
                    if (imageClassName) imgClass.push(imageClassName);
                    imgClass = joinArrayString(imgClass);

                    let props: any = { ...restItem, alt };
                    if (!alt && title) props = Object.assign(props, { alt: title });
                    if (imgClass && isLast) props = Object.assign(props, { className: imgClass });
                    if (loading && isLast) props = Object.assign(props, { loading });

                    return (
                        <Image
                            key={i}
                            {...props}
                        />
                    );
                })}
            </picture>
        );
    }
);

Base.displayName = 'Base';
export default Base;
