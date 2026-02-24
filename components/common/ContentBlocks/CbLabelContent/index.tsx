import React from 'react';

import { CB_HANDLES } from '@/components/common/ContentBlocks/handles';
import { ContentBlocksComponentProps } from '@/libs/@types';

import Columns from '@/components/common/Columns';
import Heading, { BaseProps } from '@/components/common/Heading';
import CbContainer from '@/components/common/ContentBlocks/CbContainer';
import CbText, { CbTextProps } from '@/components/common/ContentBlocks/CbText';

export type CbLabelContentProps = ContentBlocksComponentProps<
    typeof CB_HANDLES.LABEL_CONTENT,
    {
        heading?: BaseProps['children'];
        content?: CbTextProps['children'];
    }
>;

const CbLabelContent = ({ className, heading, content }: CbLabelContentProps): React.ReactElement => {
    return (
        <CbContainer
            typeClassName="cb--labelContent"
            className={className}>
            <Columns gutterY={1}>
                <Columns.Column md={4}>
                    {heading && (
                        <Heading
                            as="h2"
                            family="aboreto"
                            className="text-[2.5rem] md:text-[3.5rem]">
                            {heading}
                        </Heading>
                    )}
                </Columns.Column>

                <Columns.Column md={8}>
                    <CbText isNested>{content}</CbText>
                </Columns.Column>
            </Columns>
        </CbContainer>
    );
};

export default CbLabelContent;
