'use client';

import React, { useState } from 'react';

import { CalendarDays, Ruler } from 'lucide-react';

import Columns from '@/components/common/Columns';
import Heading, { BaseProps } from '@/components/common/Heading';
import Button, { BaseAnchorProps } from '@/components/common/Button';
import Carousel, { ThumbnailProps } from '@/components/common/Carousel';
import DetailInfo, { DetailInfoProps } from '@/components/common/Banner/Detail/DetailInfo';
import DetailCalendar, { DetailCalendarProps } from '@/components/common/Banner/Detail/DetailCalendar';
import LightBox, { LightBoxProps } from '@/components/common/Lightbox';

export type DetailProps = {
    info?: DetailInfoProps[];
    price?: BaseProps['children'];
    sizeFit?: BaseProps['children'];
    carousel?: Pick<ThumbnailProps, 'thumbnail' | 'media' | 'lightbox'>;
    calendar?: Pick<DetailCalendarProps, 'disabled'>;
    sizeGuides?: LightBoxProps['items'];
    button?: Pick<BaseAnchorProps, 'target' | 'href'>;
    children: BaseProps['children'];
};

const Detail = ({
    price,
    sizeFit,
    children,
    info,
    carousel,
    calendar,
    sizeGuides,
    button,
}: DetailProps): React.ReactElement => {
    const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
    const [selectedDate, setSelectedDate] = useState<DetailCalendarProps['selected']>();

    const hasSizeGuide = sizeGuides && sizeGuides.length > 0;

    return (
        <>
            <Columns
                gutterY={3}
                className="banner banner--detail">
                <Columns.Column md={7}>{carousel && <Carousel.Thumbnail {...carousel} />}</Columns.Column>

                <Columns.Column md={5}>
                    <Heading
                        as="h1"
                        variant="page"
                        className="md:mt-3">
                        {children}
                    </Heading>

                    {price && (
                        <Heading
                            as="h2"
                            family="space-grotesk"
                            className="mt-1.5 font-bold text-[2.2rem] uppercase tracking-[.35rem]">
                            {price}
                        </Heading>
                    )}

                    {sizeFit && (
                        <Heading
                            as="h3"
                            className="font-extrabold tracking-0.1 uppercase text-md">
                            Size: {sizeFit}
                        </Heading>
                    )}

                    {info && info.length > 0 && (
                        <>
                            {info.map((item, i) => {
                                return (
                                    <DetailInfo
                                        key={i}
                                        className="mt-3"
                                        {...item}
                                    />
                                );
                            })}
                        </>
                    )}

                    <Button.Container className="mt-4 gap-1.5 *:grow">
                        <DetailCalendar
                            selected={selectedDate}
                            setSelected={setSelectedDate}
                            disabled={calendar?.disabled}>
                            <Button.Block
                                as="button"
                                className="flex items-center justify-center">
                                <CalendarDays
                                    size={16}
                                    className="me-1"
                                />
                                Check Availability
                            </Button.Block>
                        </DetailCalendar>

                        {hasSizeGuide && (
                            <Button.Block
                                as="button"
                                onClick={() => setLightboxIndex(0)}
                                className="flex items-center justify-center">
                                <Ruler
                                    size={16}
                                    className="me-1"
                                />
                                Size Guide
                            </Button.Block>
                        )}
                    </Button.Container>

                    {button?.href && (
                        <Button.Container className="mt-1.5">
                            <Button.Block
                                as="anchor"
                                size="lg"
                                className="w-full text-center"
                                target={button.target}
                                href={button.href}>
                                RENT
                            </Button.Block>
                        </Button.Container>
                    )}
                </Columns.Column>
            </Columns>

            {hasSizeGuide && (
                <LightBox
                    className="lightbox lightbox--backdrop-semi-transparent"
                    index={lightboxIndex}
                    items={sizeGuides}
                    carousel={{
                        finite: sizeGuides.length <= 1,
                    }}
                    render={{
                        buttonPrev: sizeGuides.length > 1 ? undefined : () => null,
                        buttonNext: sizeGuides.length > 1 ? undefined : () => null,
                    }}
                    close={() => setLightboxIndex(-1)}
                />
            )}
        </>
    );
};

export default Detail;

export type { DetailInfoProps };
