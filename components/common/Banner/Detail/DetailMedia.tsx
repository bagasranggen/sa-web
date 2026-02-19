'use client';

import React, { Ref, useState } from 'react';

import { useMeasure } from 'react-use';
import { Swiper } from 'swiper/types';
import { Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css/pagination';

import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

import Columns from '@/components/common/Columns';
import Picture, { BaseProps } from '@/components/common/Picture';
import Carousel from '@/components/common/Carousel';
import Button from '@/components/common/Button';
import { createPicsumImage } from '@/libs/factory';

export type DetailMediaItemProps = BaseProps['items'];

export type DetailMediaProps = {} & Partial<Record<'thumbnail' | 'media', DetailMediaItemProps[]>>;

const DetailMedia = ({ thumbnail, media }: DetailMediaProps): React.ReactElement | null => {
    const [thumbs, setThumbs] = useState<null | Swiper>(null);
    const [openLightbox, setOpenLightbox] = useState<boolean>(false);
    const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
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
                            items={media.map((item: DetailMediaItemProps, i) => {
                                return {
                                    // children: <Picture items={item} />,
                                    children: (
                                        <Picture
                                            items={item}
                                            onClick={() => {
                                                setOpenLightbox(true);
                                                setLightboxIndex(i);
                                            }}
                                            className="cursor-pointer"
                                        />
                                    ),
                                    // children: (
                                    //     <Button
                                    //         as="button"
                                    //         className="block" onClick={}>
                                    //         <Picture items={item} />
                                    //     </Button>
                                    // ),
                                };
                            })}
                        />
                    </div>
                </Columns.Column>
            </Columns>

            <Button.Block
                as="button"
                onClick={() => {
                    setOpenLightbox(true);
                }}>
                OPEN
            </Button.Block>

            <Lightbox
                open={openLightbox}
                index={lightboxIndex}
                close={() => {
                    setOpenLightbox(false);
                    setLightboxIndex(-1);
                }}
                // slides={[createPicsumImage({}), createPicsumImage({ id: 33, width: 1000, height: 1400 })]}
                // slides={media.map((item) => item[0])}
                slides={media}
                // slides={[
                //     {
                //         // type: 'media',
                //         test: [createPicsumImage({})],
                //     },
                // ]}
                render={{
                    slide: (props) => {
                        console.log({ props });

                        // return <>CUSTOM</>;
                        // return <Picture items={[props.slide]} />;
                        return <Picture items={props.slide} />;
                    },
                }}
            />
        </>
    );
};

export default DetailMedia;
