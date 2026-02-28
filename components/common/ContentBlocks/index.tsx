import React from 'react';

import { getEnv } from '@/libs/utils';

import { CB_COMPONENT_HANDLES } from '@/components/common/ContentBlocks/handlesIndex';

import DynamicElement from '@/components/common/DynamicElement';
import { CbTextProps } from '@/components/common/ContentBlocks/CbText';
import { CbLabelContentProps } from '@/components/common/ContentBlocks/CbLabelContent';

export type ContentBlocksItemProps = CbLabelContentProps | CbTextProps;

export type ContentBlocksProps = {
    items?: ContentBlocksItemProps[];
};

const ContentBlocks = ({ items }: ContentBlocksProps): React.ReactElement | null => {
    const { isProduction } = getEnv();

    if (!items || items.length === 0) return null;

    return (
        <>
            {items.map((item: ContentBlocksItemProps, i) => {
                const component = CB_COMPONENT_HANDLES?.[item?.typeHandle as keyof typeof CB_COMPONENT_HANDLES];

                if (!component) {
                    if (!isProduction) return <>typeHandle: {item.typeHandle}</>;

                    if (isProduction) return null;
                }

                return (
                    <DynamicElement
                        key={i}
                        component={component as any}
                        props={item}>
                        {'children' in item && item?.children}
                    </DynamicElement>
                );
            })}
        </>
    );
};

export default ContentBlocks;
