import React, { forwardRef } from 'react';
import { ImageProps } from 'next/image';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import PictureSource from '@/components/common/Picture/PictureSource';
import PictureImage from '@/components/common/Picture/PictureImage';

export type BaseItemProps = {
    media?: number;
    srcRetina?: string;
    type?: string;
} & ImageProps;

export type BaseProps = {
    className?: string;
    style?: React.CSSProperties;
    events?: React.DOMAttributes<HTMLPictureElement>;
    items: BaseItemProps[];
};

const Base = forwardRef<HTMLPictureElement, BaseProps>(({ className, items, style, events, ...props }, ref) => {
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
                const Image = items.length - 1 === i ? PictureImage : PictureSource;
                const { alt, title, ...restItem } = item as any;

                let props = { ...restItem, alt };
                if (!alt && title) props = { ...props, alt: title };

                return (
                    <Image
                        key={i}
                        {...props}
                    />
                );
            })}
        </picture>
    );
});

Base.displayName = 'Base';
export default Base;
