import React, { Fragment } from 'react';

import { ContentBlocksBaseProp } from '@/libs/@types';
import { getEnv } from '@/libs/utils';

import { CB_COMPONENT_HANDLES } from '@/components/common/ContentBlocks/handlesIndex';

import DynamicElement from '@/components/common/DynamicElement';
import { CbTextProps } from '@/components/common/ContentBlocks/CbText';
import { CbLabelContentProps } from '@/components/common/ContentBlocks/CbLabelContent';

export type ContentBlocksItemProps = CbLabelContentProps | CbTextProps;

export type ContentBlocksProps = {
    items?: ContentBlocksItemProps[];
} & Pick<ContentBlocksBaseProp, 'isNested' | 'animation'>;

const ContentBlocks = ({ items, isNested, animation }: ContentBlocksProps): React.ReactElement | null => {
    const { isProduction } = getEnv();

    if (!items || items.length === 0) return null;

    return (
        <>
            {items.map((item: ContentBlocksItemProps, i) => {
                const component = CB_COMPONENT_HANDLES?.[item?.typeHandle as keyof typeof CB_COMPONENT_HANDLES];

                if (!component) {
                    if (!isProduction) return <Fragment key={i}>typeHandle: {item.typeHandle}</Fragment>;

                    if (isProduction) return null;
                }

                let props = item;
                if (isNested) props = Object.assign(props, { isNested });
                if (animation) props = Object.assign(props, { animation });

                return (
                    <DynamicElement
                        key={i}
                        component={component as any}
                        props={props}>
                        {'children' in item && item?.children}
                    </DynamicElement>
                );
            })}
        </>
    );
};

export default ContentBlocks;
