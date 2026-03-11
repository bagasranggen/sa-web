import React from 'react';

import Container from '@/components/common/Container';
import Heading, { BaseProps } from '@/components/common/Heading';
import ContentBlocks, { ContentBlocksProps } from '@/components/common/ContentBlocks';

export type StaticPageIndexProps = {
    entries: {
        header?: BaseProps['children'];
        contentBlocks?: ContentBlocksProps['items'];
    };
};

const StaticPageIndex = ({ entries }: StaticPageIndexProps): React.ReactElement => {
    return (
        <>
            {entries?.header && (
                <Container
                    as="section"
                    className="mt-8 last:mb-15">
                    <Heading
                        as="h1"
                        variant="page">
                        {entries.header}
                    </Heading>
                </Container>
            )}

            {entries?.contentBlocks && entries.contentBlocks.length > 0 && (
                <ContentBlocks
                    // items={[
                    //     {
                    //         typeHandle: 'labelContent',
                    //         className: 'mt-6',
                    //         heading: 'aa',
                    //         content: parse(TEXT_2_PARAGRAPH),
                    //     },
                    //     {
                    //         typeHandle: 'text',
                    //         className: 'mt-6',
                    //         isNested: false,
                    //         children: parse(FULL_TEXT),
                    //     },
                    // ]}
                    items={entries.contentBlocks}
                />
            )}
        </>
    );
};

export default StaticPageIndex;
