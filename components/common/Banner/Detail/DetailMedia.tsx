'use client';

import React, { Ref, useRef, useState } from 'react';

import { createPicsumImage } from '@/libs/factory';

import { useMeasure } from 'react-use';
import { Swiper } from 'swiper/types';
import { Pagination, Thumbs, Navigation } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';

import 'swiper/css/pagination';
import 'yet-another-react-lightbox/styles.css';

import Columns from '@/components/common/Columns';
import Picture, { BaseProps } from '@/components/common/Picture';
import Carousel from '@/components/common/Carousel';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

export type DetailMediaItemProps = BaseProps['items'];

export type DetailMediaProps = {} & Partial<Record<'thumbnail' | 'media', DetailMediaItemProps[]>>;

const DetailMedia = ({ thumbnail, media }: DetailMediaProps): React.ReactElement | null => {
    const [thumbs, setThumbs] = useState<null | Swiper>(null);
    const [preview, setPreview] = useState<null | Swiper>(null);
    const [openLightbox, setOpenLightbox] = useState<boolean>(false);
    const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
    const thumbPrevRef = useRef(null);
    const thumbNextRef = useRef(null);
    const previewPrevRef = useRef(null);
    const previewNextRef = useRef(null);
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
        <>
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
                            modules={[Pagination, Thumbs, Navigation]}
                            navigation={{
                                prevEl: thumbPrevRef.current,
                                nextEl: thumbNextRef.current,
                                disabledClass: 'opacity-40 pointer-events-none',
                            }}
                            breakpoints={{
                                0: {
                                    direction: 'horizontal',
                                    navigation: { enabled: false },
                                    pagination: { enabled: true },
                                },
                                768: {
                                    direction: 'vertical',
                                    navigation: { enabled: true },
                                    pagination: { enabled: false },
                                },
                            }}
                            items={thumbnail.map((item: DetailMediaItemProps) => {
                                return {
                                    children: <Picture items={item} />,
                                };
                            })}>
                            {thumbnail.length > 3 && (
                                <div className="max-md:hidden">
                                    <Button
                                        ref={thumbPrevRef}
                                        className="swiper__navigation swiper__navigation--prev">
                                        <Icon.Chevron
                                            direction="up"
                                            withCircle={{ color: 'primary', size: 'sm' }}
                                        />
                                    </Button>

                                    <Button
                                        ref={thumbNextRef}
                                        className="swiper__navigation swiper__navigation--next">
                                        <Icon.Chevron withCircle={{ color: 'primary', size: 'sm' }} />
                                    </Button>
                                </div>
                            )}
                        </Carousel>
                    </div>
                </Columns.Column>

                <Columns.Column
                    md={9}
                    className="order-1 md:order-2">
                    <div ref={previewRef as Ref<HTMLDivElement>}>
                        <Carousel
                            className="banner__preview"
                            onSwiper={setPreview}
                            thumbs={{ swiper: thumbs }}
                            modules={[Thumbs, Navigation]}
                            navigation={{
                                enabled: true,
                                prevEl: previewPrevRef.current,
                                nextEl: previewNextRef.current,
                                disabledClass: 'opacity-40 pointer-events-none',
                            }}
                            breakpoints={{
                                0: {
                                    allowTouchMove: true,
                                },
                                768: {
                                    allowTouchMove: false,
                                },
                            }}
                            items={media.map((item: DetailMediaItemProps, i) => {
                                return {
                                    // children: <Picture items={item} />,
                                    children: (
                                        <Picture
                                            items={item}
                                            // onClick={() => {
                                            // setOpenLightbox(true);
                                            // setLightboxIndex(i);
                                            // }}
                                            // className="cursor-pointer"
                                        />
                                    ),
                                };
                            })}>
                            {media.length > 1 && (
                                <div className="swiper__navigation">
                                    <Button ref={previewPrevRef}>
                                        <Icon.Arrow
                                            direction="left"
                                            withCircle={{ color: 'primary' }}
                                        />
                                    </Button>

                                    <Button ref={previewNextRef}>
                                        <Icon.Arrow withCircle={{ color: 'primary', size: 'lg' }} />
                                    </Button>
                                </div>
                            )}
                        </Carousel>
                    </div>
                </Columns.Column>
            </Columns>

            {/*<Button.Block*/}
            {/*    as="button"*/}
            {/*    onClick={() => {*/}
            {/*        setOpenLightbox(true);*/}
            {/*    }}>*/}
            {/*    OPEN*/}
            {/*</Button.Block>*/}

            {/*<Lightbox*/}
            {/*    open={openLightbox}*/}
            {/*    index={lightboxIndex}*/}
            {/*    close={() => {*/}
            {/*        setOpenLightbox(false);*/}
            {/*        setLightboxIndex(-1);*/}
            {/*    }}*/}
            {/*    slides={[*/}
            {/*        createPicsumImage({ width: 1000, height: 1400 }),*/}
            {/*        createPicsumImage({ id: 33, width: 1000, height: 1400 }),*/}
            {/*    ]}*/}
            {/*    // slides={media.map((item) => item[0])}*/}
            {/*    // slides={media}*/}
            {/*    // slides={[*/}
            {/*    //     {*/}
            {/*    //         // type: 'media',*/}
            {/*    //         test: [createPicsumImage({})],*/}
            {/*    //     },*/}
            {/*    // ]}*/}
            {/*    // render={{*/}
            {/*    //     slide: (props) => {*/}
            {/*    //         console.log({ props });*/}
            {/*    //*/}
            {/*    //         // return <>CUSTOM</>;*/}
            {/*    //         // return <Picture items={[props.slide]} />;*/}
            {/*    //         return <Picture items={props.slide} />;*/}
            {/*    //     },*/}
            {/*    // }}*/}
            {/*/>*/}
        </>
    );
};

export default DetailMedia;
