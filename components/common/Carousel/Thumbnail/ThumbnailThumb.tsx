import React from 'react';

import Picture, { BaseProps as BasePictureProps } from '@/components/common/Picture';
import Base, { BaseProps as BaseCarouselProps } from '@/components/common/Carousel/Base';
import { ThumbnailThumbVariant } from '@/components/common/Carousel/Thumbnail/ThumbnailVariant';

import 'swiper/css/pagination';

export type ThumbnailThumbItemProps = BasePictureProps['items'];

export type ThumbnailThumbProps = {
    items?: ThumbnailThumbItemProps[];
} & Omit<
    BaseCarouselProps,
    'slidesPerView' | 'spaceBetween' | 'autoHeight' | 'pagination' | 'navigation' | 'breakpoints' | 'modules'
>;

const ThumbnailThumb = ({ items, children, ...props }: ThumbnailThumbProps): React.ReactElement | null => {
    if (!items || items.length === 0) return null;

    return (
        <Base
            modulesVariant={ThumbnailThumbVariant}
            items={items.map((item: ThumbnailThumbItemProps) => {
                return {
                    children: <Picture items={item} />,
                };
            })}
            {...props}>
            {children}
        </Base>
    );
};

export default ThumbnailThumb;
