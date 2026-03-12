import React from 'react';

import Container from '@/components/common/Container';
import Heading, { BaseProps } from '@/components/common/Heading';
import ContentBlocks, { ContentBlocksProps } from '@/components/common/ContentBlocks';
import Animation from '@/components/common/Animation';

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
                <Animation
                    type="fade-in"
                    id="fadeBanner">
                    <Container
                        as="section"
                        className="mt-8 last:mb-15">
                        <Heading
                            as="h1"
                            variant="page">
                            {entries.header}
                        </Heading>
                    </Container>
                </Animation>
            )}

            {entries?.contentBlocks && entries.contentBlocks.length > 0 && (
                <ContentBlocks
                    items={entries.contentBlocks}
                    animation={{ delay: 'fadeBanner' }}
                />
            )}
        </>
    );
};

export default StaticPageIndex;
