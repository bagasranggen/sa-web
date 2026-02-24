import React, { PropsWithChildren } from 'react';

import { CB_HANDLES } from '@/components/common/ContentBlocks/handles';
import { ContentBlocksComponentProps } from '@/libs/@types';

import CbContainer from '@/components/common/ContentBlocks/CbContainer';

export type CbTextProps = ContentBlocksComponentProps<typeof CB_HANDLES.TEXT, PropsWithChildren>;

const CbText = ({ className, isNested, children }: CbTextProps): React.ReactElement | null => {
    if (!children) return null;

    return (
        <CbContainer
            typeClassName="cb--text"
            isNested={isNested}
            className={className}>
            {children}
        </CbContainer>
    );
};

export default CbText;
