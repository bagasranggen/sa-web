'use client';

import React, { PropsWithChildren, Ref } from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import { useMeasure } from 'react-use';

import Container from '@/components/common/Container';
import Columns from '@/components/common/Columns';
import Heading from '@/components/common/Heading';
import Picture, { BaseProps } from '@/components/common/Picture';
import Button, { BaseAnchorProps } from '@/components/common/Button';
import Marquee from '@/components/common/Marquee';

export type HomepageMediaItemProps = {
    link: Pick<BaseAnchorProps, 'href' | 'target'>;
} & Pick<BaseProps, 'items'>;

export type HomepageProps = {
    description?: PropsWithChildren['children'];
    media?: HomepageMediaItemProps[];
} & (ClassnameProps & PropsWithChildren);

const Homepage = ({ className, description, media, children }: HomepageProps): React.ReactElement => {
    const [marqueeContainerRef, { width }] = useMeasure();

    let bannerClass: ArrayStringProps = ['banner banner--homepage'];
    if (className) bannerClass.push(className);
    bannerClass = joinArrayString(bannerClass);

    return (
        <>
            <section className={bannerClass}>
                <Container className="mt-8">
                    <Columns
                        className="justify-between items-end"
                        gutterY={2}>
                        <Columns.Column md={7}>
                            <Heading
                                as="h1"
                                variant="page">
                                {children}
                            </Heading>
                        </Columns.Column>

                        {description && (
                            <Columns.Column md={4}>
                                <div className="text-lg">{description}</div>
                            </Columns.Column>
                        )}
                    </Columns>
                </Container>

                {media && media.length > 0 && (
                    <Marquee
                        withContainer
                        className="marquee-gap-3 banner__marquee">
                        <div
                            ref={marqueeContainerRef as Ref<HTMLDivElement>}
                            className="marquee__media">
                            {media.map((item, i) => {
                                if (!item?.link?.href) return null;
                                if (!item?.items || item.items.length === 0) return null;

                                return (
                                    <Button
                                        key={i}
                                        as="anchor"
                                        {...item.link}>
                                        <Picture
                                            items={item.items}
                                            style={{ '--image-width': `${width}px` } as React.CSSProperties}
                                        />
                                    </Button>
                                );
                            })}
                        </div>
                    </Marquee>
                )}
            </section>
        </>
    );
};

export default Homepage;
