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
import RichText, { RichTextProps } from '@/components/common/RichText';
import Animation, { AnimationProps } from '@/components/common/Animation';

export type HomepageMediaItemProps = {
    link: Pick<BaseAnchorProps, 'href' | 'target'>;
} & Pick<BaseProps, 'items'>;

export type HomepageProps = {
    description?: RichTextProps['children'];
    media?: HomepageMediaItemProps[];
    animation?: Omit<AnimationProps, 'children'>;
} & (ClassnameProps & PropsWithChildren);

const Homepage = ({ className, description, media, children, animation }: HomepageProps): React.ReactElement => {
    const [marqueeContainerRef, { width }] = useMeasure();

    let bannerClass: ArrayStringProps = ['banner banner--homepage'];
    if (className) bannerClass.push(className);
    bannerClass = joinArrayString(bannerClass);

    return (
        <Animation {...(animation as AnimationProps)}>
            <section className={bannerClass}>
                <Container>
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
                                <RichText className="text-lg">{description}</RichText>
                            </Columns.Column>
                        )}
                    </Columns>
                </Container>

                {media && media.length > 0 && (
                    <Marquee
                        withContainer
                        className="marquee-gap-3 banner__marquee"
                        speed={1.25}>
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
        </Animation>
    );
};

export default Homepage;
