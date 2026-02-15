'use client';

import React, { PropsWithChildren, useState } from 'react';

import { ClassnameProps } from '@/libs/@types';
import { createPicsumImage } from '@/libs/factory';

import Columns from '@/components/common/Columns';
import Picture from '@/components/common/Picture';
import Heading, { BaseProps as BaseHeadingProps } from '@/components/common/Heading';
import Button, { BaseAnchorProps } from '@/components/common/Button';

export type HighlightItemProps = {
    link: Pick<BaseAnchorProps, 'href' | 'target'>;
    label?: BaseHeadingProps['children'];
    description?: PropsWithChildren['children'];
} & (ClassnameProps & PropsWithChildren);

const HighlightItem = ({
    className,
    description,
    link,
    label,
    children,
}: HighlightItemProps): React.ReactElement | null => {
    const [isHover, setIsHover] = useState(false);

    if (!link || !link?.href) return null;

    return (
        <Button
            as="anchor"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            {...link}>
            <Columns
                className={className}
                gutterX={0}>
                <Columns.Column md={7}>
                    <Picture items={[createPicsumImage({ width: 600, height: 800 })]} />
                </Columns.Column>

                <Columns.Column md={5}>
                    <div className="cards__content">
                        <div className="cards__heading">
                            {label && (
                                <Heading
                                    as="h3"
                                    className="uppercase font-bold text-sm text-sekar-primary tracking-[.3rem] mb-1">
                                    {label}
                                </Heading>
                            )}

                            <Heading
                                as="h2"
                                family="aboreto"
                                className="text-[2.4rem]">
                                {children}
                            </Heading>
                        </div>

                        <div className="mt-5">
                            {description && <div className="cards__description">{description}</div>}

                            <Button.Container className="mt-2">
                                <Button.Block
                                    className="inline"
                                    active={isHover}>
                                    More Detail
                                </Button.Block>
                            </Button.Container>
                        </div>
                    </div>
                </Columns.Column>
            </Columns>
        </Button>
    );
};

export default HighlightItem;
