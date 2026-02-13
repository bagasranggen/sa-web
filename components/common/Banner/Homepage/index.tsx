import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Container from '@/components/common/Container';
import Columns from '@/components/common/Columns';
import Heading from '@/components/common/Heading';
import Picture, { BaseProps } from '@/components/common/Picture';
import Button, { BaseAnchorProps } from '@/components/common/Button';

export type HomepageMediaItemProps = {
    link: Pick<BaseAnchorProps, 'href' | 'target'>;
} & Pick<BaseProps, 'items'>;

export type HomepageProps = {
    description?: PropsWithChildren['children'];
    media?: HomepageMediaItemProps[];
} & (ClassnameProps & PropsWithChildren);

const Homepage = ({ className, description, media, children }: HomepageProps): React.ReactElement => {
    let bannerClass: ArrayStringProps = ['banner banner--homepage'];
    if (className) bannerClass.push(className);
    bannerClass = joinArrayString(bannerClass);

    return (
        <>
            <section className={bannerClass}>
                <Container className="mt-8">
                    <Columns className="justify-between items-end">
                        <Columns.Column md={7}>
                            <Heading
                                family="aboreto"
                                className="text-[4.5rem] leading-5">
                                {children}
                            </Heading>
                        </Columns.Column>

                        {description && (
                            <Columns.Column md={4}>
                                <div className="text-md">{description}</div>
                            </Columns.Column>
                        )}
                    </Columns>
                </Container>

                {/* TODO: Change with marquee later on */}
                {media && media.length > 0 && (
                    <div className="mt-5 overflow-hidden">
                        <Container>
                            <Columns className="flex-nowrap!">
                                {media.map((item: HomepageMediaItemProps, i: number) => {
                                    if (!item?.link?.href) return null;
                                    if (!item?.items || item.items.length === 0) return null;

                                    return (
                                        <Columns.Column
                                            key={i}
                                            md={4}>
                                            <Button
                                                as="anchor"
                                                {...item.link}>
                                                <Picture items={item.items} />
                                            </Button>
                                        </Columns.Column>
                                    );
                                })}
                            </Columns>
                        </Container>
                    </div>
                )}
            </section>
        </>
    );
};

export default Homepage;
