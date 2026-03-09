import React from 'react';

import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

import DynamicWrapper from '@/components/common/DynamicWrapper';

export type RichTextProps = {
    children?: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

const RichText = ({ children, ...props }: RichTextProps): React.ReactElement | null => {
    if (!children) return null;

    return (
        <DynamicWrapper
            as={Object.keys(props).length > 0 ? 'div' : undefined}
            {...props}>
            <RichTextConverter data={children} />
        </DynamicWrapper>
    );
};

export default RichText;
