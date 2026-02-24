import React from 'react';

import Picture, { BaseProps as BasePictureProps } from '@/components/common/Picture';
import Base, { BaseProps as BaseCarouselProps } from '@/components/common/Carousel/Base';
import { ThumbnailPreviewVariant } from '@/components/common/Carousel/Thumbnail/ThumbnailVariant';

export type ThumbnailPreviewItemProps = BasePictureProps['items'];

export type ThumbnailPreviewProps = {
    items?: ThumbnailPreviewItemProps[];
    onClick?: (index: number) => void;
} & Omit<BaseCarouselProps, 'breakpoints' | 'navigation' | 'modules' | 'onClick'>;

const ThumbnailPreview = ({ items, children, onClick, ...props }: ThumbnailPreviewProps): React.ReactElement | null => {
    if (!items || items.length === 0) return null;

    return (
        <Base
            modulesVariant={ThumbnailPreviewVariant}
            items={items.map((item: ThumbnailPreviewItemProps, i) => {
                return {
                    children: (
                        <Picture
                            items={item}
                            onClick={() => {
                                if (onClick) onClick(i);
                            }}
                            className={onClick ? 'cursor-pointer' : undefined}
                        />
                    ),
                };
            })}
            {...props}>
            {children}
        </Base>
    );
};

export default ThumbnailPreview;
