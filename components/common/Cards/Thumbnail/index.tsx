import React from 'react';

import Columns from '@/components/common/Columns';
import Button, { BaseAnchorProps } from '@/components/common/Button';
import Picture, { BaseProps } from '@/components/common/Picture';
import Heading, { BaseProps as BaseHeadingProps } from '@/components/common/Heading';

export type ThumbnailItemProps = {
    link: Pick<BaseAnchorProps, 'href' | 'target'>;
    media: BaseProps['items'];
    colors?: string[];
    price?: BaseHeadingProps['children'];
    children: BaseHeadingProps['children'];
};

export type ThumbnailProps = {
    items: ThumbnailItemProps[];
};

const Thumbnail = ({ items }: ThumbnailProps): React.ReactElement | null => {
    if (!items || items.length === 0) return null;

    return (
        <Columns
            className="cards cards--thumbnail"
            gutterX={0}
            gutterY={4}>
            {items.map((item, i) => {
                if (!item?.link || !item?.link?.href) return null;

                return (
                    <Columns.Column
                        key={i}
                        md={3}>
                        <Button
                            as="anchor"
                            {...item.link}>
                            <Picture items={item.media} />

                            {item?.colors && item.colors.length > 0 && (
                                <div className="cards__colors">
                                    {item.colors.map((color, idx) => (
                                        <div
                                            key={idx}
                                            style={{ '--thumbnail-color': color } as React.CSSProperties}
                                            className="cards__color"
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="mt-1">
                                <Heading
                                    as="h3"
                                    family="aboreto"
                                    className="text-lg">
                                    {item.children}
                                </Heading>

                                {item?.price && (
                                    <Heading
                                        as="h4"
                                        className="cards__price">
                                        Rp130,000/3day(s)
                                    </Heading>
                                )}
                            </div>
                        </Button>
                    </Columns.Column>
                );
            })}
        </Columns>
    );
};

export default Thumbnail;
