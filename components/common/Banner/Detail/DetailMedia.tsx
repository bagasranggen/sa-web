'use client';

import React, { Ref, useState } from 'react';

import { useMeasure } from 'react-use';
import { Swiper } from 'swiper/types';
import { Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css/pagination';

import Columns from '@/components/common/Columns';
import Picture, { BaseProps } from '@/components/common/Picture';
import Carousel from '@/components/common/Carousel';

export type DetailMediaItemProps = BaseProps['items'];

export type DetailMediaProps = {} & Partial<Record<'thumbnail' | 'media', DetailMediaItemProps[]>>;

const DetailMedia = ({ thumbnail, media }: DetailMediaProps): React.ReactElement | null => {
    const [thumbs, setThumbs] = useState<null | Swiper>(null);
    const [previewRef, { height }] = useMeasure();

    let thumbStyle: React.CSSProperties = {};
    if (height > 0) {
        thumbStyle = Object.assign(thumbStyle, {
            '--banner-thumb-wrapper': `${height}px`,
            '--banner-thumb-item-height': `${height / 3 - 5}px`,
        });
    }

    if (!thumbnail || thumbnail.length === 0) return null;
    if (!media || media.length === 0) return null;

    return (
        <Columns gutter={1}>
            <Columns.Column
                md={3}
                className="order-2 md:order-1">
                <div
                    style={thumbStyle}
                    className="banner__thumb-wrapper">
                    <Carousel
                        className="banner__thumb"
                        onSwiper={setThumbs}
                        slidesPerView={3}
                        slidesPerGroup={3}
                        spaceBetween={10}
                        autoHeight
                        pagination={{ clickable: true }}
                        modules={[Pagination, Thumbs]}
                        breakpoints={{
                            0: {
                                direction: 'horizontal',
                                pagination: { enabled: true },
                            },
                            768: {
                                direction: 'vertical',
                                pagination: { enabled: false },
                            },
                        }}
                        items={thumbnail.map((item: DetailMediaItemProps) => {
                            return {
                                children: <Picture items={item} />,
                            };
                        })}
                    />
                </div>
            </Columns.Column>

            <Columns.Column
                md={9}
                className="order-1 md:order-2">
                <div ref={previewRef as Ref<HTMLDivElement>}>
                    <Carousel
                        thumbs={{ swiper: thumbs }}
                        modules={[Thumbs]}
                        items={media.map((item: DetailMediaItemProps) => {
                            return {
                                children: <Picture items={item} />,
                            };
                        })}
                    />
                </div>
            </Columns.Column>
        </Columns>
    );
};

export default DetailMedia;
