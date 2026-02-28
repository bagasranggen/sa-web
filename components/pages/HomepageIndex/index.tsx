import React from 'react';

import Banner, { HomepageProps } from '@/components/common/Banner';
import Cards, { HighlightProps, MediaProps } from '@/components/common/Cards';
import Heading from '@/components/common/Heading';
import Container from '@/components/common/Container';

export type HomepageIndexProps = {
    entries: {
        banner: Pick<HomepageProps, 'children' | 'media' | 'description'>;
        highlight: HighlightProps['items'];
        collection: MediaProps['items'];
    };
};

const HomepageIndex = ({ entries }: HomepageIndexProps): React.ReactElement => {
    return (
        <>
            {entries?.banner && (
                <Banner.Homepage
                    className="mt-8"
                    {...entries.banner}
                />
            )}

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

            {entries?.collection && entries.collection.length > 0 && (
                <Container
                    type="full-screen"
                    className="px-0 mt-15 mb-15">
                    <div className="text-center mb-3">
                        <Heading
                            as="h2"
                            variant="section">
                            Our Collection
                        </Heading>
                    </div>

                    <Cards.Media items={entries.collection} />
                </Container>
            )}
        </>
    );
};

export default HomepageIndex;
