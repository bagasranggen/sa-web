import React, { useState } from 'react';

import Columns from '@/components/common/Columns';
import Heading, { BaseProps } from '@/components/common/Heading';
import Button from '@/components/common/Button';
import Carousel, { ThumbnailProps } from '@/components/common/Carousel';
import DetailInfo, { DetailInfoProps } from '@/components/common/Banner/Detail/DetailInfo';
import DetailCalendar, { DetailCalendarProps } from '@/components/common/Banner/Detail/DetailCalendar';
import LightBox, { LightBoxProps } from '@/components/common/Lightbox';

export type DetailProps = {
    info?: DetailInfoProps[];
    price?: BaseProps['children'];
    carousel?: Pick<ThumbnailProps, 'thumbnail' | 'media' | 'lightbox'>;
    calendar?: Pick<DetailCalendarProps, 'disabled'>;
    sizeGuides?: LightBoxProps['items'];
    children: BaseProps['children'];
};

const Detail = ({ price, children, info, carousel, calendar, sizeGuides }: DetailProps): React.ReactElement => {
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

                    {info && info.length > 0 && (
                        <>
                            {info.map((item, i) => {
                                return (
                                    <DetailInfo
                                        key={i}
                                        className="mt-3"
                                        title={item.title}
                                        list={item.list}>
                                        {item.children}
                                    </DetailInfo>
                                );
                            })}
                        </>
                    )}

                    <Button.Container className="mt-4 gap-1.5 *:grow">
                        <DetailCalendar
                            selected={selectedDate}
                            setSelected={setSelectedDate}
                            disabled={calendar?.disabled}
                            // disabled={[new Date(2026, 1, 26)]}
                        />

                        {hasSizeGuide && (
                            <Button.Block
                                as="button"
                                onClick={() => setLightboxIndex(0)}>
                                Size Guide
                            </Button.Block>
                        )}
                    </Button.Container>

                    <Button.Container className="mt-1.5">
                        <Button.Block
                            as="button"
                            size="lg"
                            className="w-full">
                            RENT
                        </Button.Block>
                    </Button.Container>
                </Columns.Column>
            </Columns>

            {hasSizeGuide && (
                <LightBox
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
