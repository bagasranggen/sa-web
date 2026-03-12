import React from 'react';

import { CB_HANDLES } from '@/components/common/ContentBlocks/handles';
import { ContentBlocksComponentProps } from '@/libs/@types';

import CbContainer from '@/components/common/ContentBlocks/CbContainer';
import RichText, { RichTextProps } from '@/components/common/RichText';

export type CbTextProps = ContentBlocksComponentProps<typeof CB_HANDLES.TEXT, Pick<RichTextProps, 'children'>>;

const CbText = ({ className, isNested, children, animation }: CbTextProps): React.ReactElement | null => {
    if (!children) return null;

    return (
        <CbContainer
            typeClassName="cb--text"
            isNested={isNested}
            className={className}
            animation={{
                enabled: !isNested,
                delay: animation?.delay,
            }}>
            <RichText>{children}</RichText>
        </CbContainer>
    );
};

export default CbText;
