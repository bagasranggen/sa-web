import React from 'react';

import Banner, { HomepageProps } from '@/components/common/Banner';
import Cards, { HighlightProps, MediaProps } from '@/components/common/Cards';
import Heading, { BaseProps } from '@/components/common/Heading';
import Container from '@/components/common/Container';
import Animation from '@/components/common/Animation';

export type HomepageIndexProps = {
    entries: {
        banner: Pick<HomepageProps, 'children' | 'media' | 'description'>;
        highlight: HighlightProps['items'];
        collection: {
            title?: BaseProps['children'];
            items?: MediaProps['items'];
        };
    };
};

const HomepageIndex = ({ entries }: HomepageIndexProps): React.ReactElement => {
    return (
        <>
            {entries?.banner && (
                <Banner.Homepage
                    className="mt-3 md:mt-8 mb-10 md:mb-15"
                    animation={{ id: 'fadeBanner' }}
                    {...entries.banner}
                />
            )}

            {entries?.highlight && entries.highlight.length > 0 && (
                <Animation
                    type="fade-in"
                    config={{ delay: 'fadeBanner' }}>
                    <Container
                        as="section"
                        className="mt-10 md:mt-15 mb-10 md:mb-15">
                        <Cards.Highlight
                            className="*:not-first:mt-3 md:*:not-first:mt-8"
                            items={entries.highlight}
                        />
                    </Container>
                </Animation>
            )}

            {entries?.collection?.items && entries.collection.items.length > 0 && (
                <Animation type="fade-in">
                    <Container
                        as="section"
                        type="none"
                        className="px-0 mt-10 md:mt-15 mb-10 md:mb-15">
                        {entries?.collection?.title && (
                            <Container className="text-center mb-3">
                                <Heading
                                    as="h2"
                                    variant="section">
                                    {entries.collection.title}
                                </Heading>
                            </Container>
                        )}

                        <Container type="full-screen">
                            <Cards.Media items={entries.collection.items} />
                        </Container>
                    </Container>
                </Animation>
            )}
        </>
    );
};

export default HomepageIndex;
