import React, { forwardRef } from 'react';
import { ImageProps } from 'next/image';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import PictureSource from '@/components/common/Picture/PictureSource';
import PictureImage from '@/components/common/Picture/PictureImage';

export type BaseItemProps = {
    media?: number;
    srcRetina?: string;
    type?: string;
} & ImageProps;

export type BaseProps = {
    className?: ClassnameProps['className'];
    imageClassName?: ClassnameProps['className'];
    style?: React.CSSProperties;
    events?: React.DOMAttributes<HTMLPictureElement>;
    items: BaseItemProps[];
};

const Base = forwardRef<HTMLPictureElement, BaseProps>(
    ({ className, imageClassName, items, style, events, ...props }, ref) => {
        let pictureClass: ArrayStringProps = [];
        if (className) pictureClass.push(className);
        pictureClass = joinArrayString(pictureClass);

        let pictureProps = props;
        if (style) pictureProps = { ...pictureProps, style: style };
        if (events) pictureProps = { ...pictureProps, ...events };

        return (
            <picture
                ref={ref}
                {...(pictureClass ? { className: pictureClass } : {})}
                {...pictureProps}>
                {items.map((item, i) => {
                    const isLast = items.length - 1 === i;

                    const Image = items.length - 1 === i ? PictureImage : PictureSource;
                    const { alt, title, className, ...restItem } = item as any;

                    let imgClass: ArrayStringProps = className ? [className] : [];
                    if (imageClassName) imgClass.push(imageClassName);
                    imgClass = joinArrayString(imgClass);

                    let props: any = { ...restItem, alt };
                    if (!alt && title) props = Object.assign(props, { alt: title });
                    if (imgClass) props = Object.assign(props, { className: imgClass });

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
