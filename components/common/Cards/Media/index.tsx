import React from 'react';

import Columns from '@/components/common/Columns';
import Button, { BaseAnchorProps } from '@/components/common/Button';
import Picture, { BaseProps } from '@/components/common/Picture';
import Heading from '@/components/common/Heading';

export type MediaItemProps = {
    media: BaseProps['items'];
    link: Pick<BaseAnchorProps, 'href' | 'target' | 'children'>;
};

export type MediaProps = {
    items: MediaItemProps[];
};

const Media = ({ items }: MediaProps): React.ReactElement | null => {
    if (!items || items.length === 0) return null;

    return (
        <Columns
            className="cards cards--media"
            gutterX={0}>
            {items.map((item, i) => {
                if (!item?.media || item.media.length === 0) return null;
                if (!item?.link || !item?.link?.href) return null;

                return (
                    <Columns.Column
                        key={i}
                        sm={6}
                        md={4}
                        xl={3}>
                        <Button
                            as="anchor"
                            className="cards__item group"
                            href={item.link.href}
                            target={item.link.target}>
                            <Picture
                                items={item.media}
                                imageClassName="cards__media"
                            />

                            <div className="cards__label ">
                                <Heading
                                    family="aboreto"
                                    className="cards__heading">
                                    {item.link.children}
                                </Heading>
                            </div>
                        </Button>
                    </Columns.Column>
                );
            })}
        </Columns>
    );
};

export default Media;
