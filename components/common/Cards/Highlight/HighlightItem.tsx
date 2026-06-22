'use client';

import React, { PropsWithChildren, useState } from 'react';

import { ClassnameProps } from '@/libs/@types';

import Columns from '@/components/common/Columns';
import Picture, { BaseProps as BasePictureProps } from '@/components/common/Picture';
import Heading, { BaseProps as BaseHeadingProps } from '@/components/common/Heading';
import Button, { BaseAnchorProps } from '@/components/common/Button';
import RichText, { RichTextProps } from '@/components/common/RichText';

export type HighlightItemProps = {
    link: Pick<BaseAnchorProps, 'href' | 'target' | 'children'>;
    media: BasePictureProps['items'];
    label?: BaseHeadingProps['children'];
    description?: RichTextProps['children'];
} & (ClassnameProps & PropsWithChildren);

const HighlightItem = ({
    className,
    link,
    media,
    label,
    description,
    children,
}: HighlightItemProps): React.ReactElement | null => {
    const [isHover, setIsHover] = useState(false);

    if (!link || !link?.href) return null;
    if (!media || media.length === 0) return null;

    return (
        <Button
            as="anchor"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            href={link.href}
            target={link.target}>
            <Columns
                className={className}
                gutterX={0}>
                <Columns.Column md={7}>
                    <Picture items={media} />
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

                        <div className="mt-2 md:mt-5">
                            {description && <RichText className="cards__description">{description}</RichText>}

                            <Button.Container className="mt-2">
                                <Button.Block
                                    className="inline"
                                    active={isHover}>
                                    {link?.children ?? 'More Detail'}
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
