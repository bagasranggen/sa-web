import React from 'react';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Cards, { ThumbnailProps } from '@/components/common/Cards';
import Banner, { DetailProps } from '@/components/common/Banner';
import Animation from '@/components/common/Animation';

export type ProductDetailIndexProps = {
    entries: {
        banner?: DetailProps;
        recommendation: ThumbnailProps['items'];
    };
};

const ProductDetailIndex = ({ entries }: ProductDetailIndexProps): React.ReactElement => {
    return (
        <>
            {entries?.banner && (
                <Animation type="fade-in">
                    <Container
                        as="section"
                        className="mt-8 last:mb-15">
                        <Banner.Detail {...entries.banner} />
                    </Container>
                </Animation>
            )}

            {entries?.recommendation && entries.recommendation.length > 0 && (
                <Animation type="fade-in">
                    <Container
                        as="section"
                        className="mt-15 mb-15">
                        <div className="text-center mb-4">
                            <Heading
                                as="h2"
                                variant="section">
                                Our Collection
                            </Heading>
                        </div>

                        <Cards.Thumbnail items={entries.recommendation} />
                    </Container>
                </Animation>
            )}
        </>
    );
};

export default ProductDetailIndex;
