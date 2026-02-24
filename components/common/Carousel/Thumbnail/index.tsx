'use client';

import React, { Ref, useState } from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import { Swiper } from 'swiper/types';
import { useMeasure } from 'react-use';

import Columns from '@/components/common/Columns';
import ThumbnailPreview, { ThumbnailPreviewProps } from '@/components/common/Carousel/Thumbnail/ThumbnailPreview';
import ThumbnailThumb, { ThumbnailThumbProps } from '@/components/common/Carousel/Thumbnail/ThumbnailThumb';
import {
    ThumbnailPreviewNavigation,
    ThumbnailThumbNavigation,
} from '@/components/common/Carousel/Thumbnail/ThumbnailVariant';
import LightBox, { LightBoxProps } from '@/components/common/Lightbox';

export type ThumbnailProps = {
    thumbnail?: ThumbnailThumbProps['items'];
    media?: ThumbnailPreviewProps['items'];
    lightbox?: LightBoxProps['items'];
} & ClassnameProps;

const Thumbnail = ({ className, media, thumbnail, lightbox }: ThumbnailProps): React.ReactElement | null => {
    const [thumbs, setThumbs] = useState<null | Swiper>(null);
    const [preview, setPreview] = useState<null | Swiper>(null);
    const [lightboxIndex, setLightboxIndex] = useState<LightBoxProps['index']>(-1);
    const [previewRef, { height }] = useMeasure();

    const hasLightbox = lightbox && lightbox.length > 0;

    let carouselClass: ArrayStringProps = ['slider slider--thumbnail'];
    if (className) carouselClass.push(className);
    carouselClass = joinArrayString(carouselClass);

    let thumbStyle: React.CSSProperties = {};
    if (height > 0) {
        thumbStyle = Object.assign(thumbStyle, {
            '--slider-thumb-wrapper': `${height}px`,
            '--slider-thumb-item-height': `${height / 3 - 5}px`,
        });
    }

    if (!thumbnail || thumbnail.length === 0) return null;
    if (!media || media.length === 0) return null;

    return (
        <>
            <Columns
                className={carouselClass}
                gutter={1}>
                <Columns.Column
                    md={3}
                    className="order-2 md:order-1">
                    <div
                        style={thumbStyle}
                        className="slider__thumb-wrapper">
                        <ThumbnailThumb
                            className="slider__thumb"
                            onSwiper={setThumbs}
                            items={thumbnail}>
                            {thumbnail.length > 3 && <ThumbnailThumbNavigation />}
                        </ThumbnailThumb>
                    </div>
                </Columns.Column>

                <Columns.Column
                    md={9}
                    className="order-1 md:order-2">
                    <div ref={previewRef as Ref<HTMLDivElement>}>
                        <ThumbnailPreview
                            className="slider__preview"
                            onSwiper={setPreview}
                            thumbs={{ swiper: thumbs }}
                            items={media}
                            onClick={hasLightbox ? (index) => setLightboxIndex(index) : undefined}>
                            {media.length > 1 && <ThumbnailPreviewNavigation />}
                        </ThumbnailPreview>
                    </div>
                </Columns.Column>
            </Columns>

            <LightBox
                className="lightbox lightbox--backdrop-semi-transparent"
                index={lightboxIndex}
                close={() => {
                    setLightboxIndex(-1);
                }}
                on={{
                    view: ({ index }) => {
                        if (!preview) return;

                        preview.slideTo(index);
                    },
                }}
                items={lightbox}
            />
        </>
    );
};

export default Thumbnail;
