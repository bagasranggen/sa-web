import React from 'react';

import Banner, { HomepageProps } from '@/components/common/Banner';
import Cards, { HighlightProps } from '@/components/common/Cards';
import Container from '@/components/common/Container';

export type HomepageIndexProps = {
    entries: {
        banner: Pick<HomepageProps, 'children' | 'media' | 'description'>;
        highlight: HighlightProps['items'];
    };
};

const HomepageIndex = ({ entries }: HomepageIndexProps): React.ReactElement => {
    return (
        <>
            {entries?.banner && <Banner.Homepage {...entries.banner} />}

            {entries?.highlight && entries.highlight.length > 0 && (
                <Container
                    as="section"
                    className="mt-15">
                    <Cards.Highlight
                        className="*:not-first:mt-3 md:*:not-first:mt-8"
                        items={entries.highlight}
                    />
                </Container>
            )}
        </>
    );
};

export default HomepageIndex;
