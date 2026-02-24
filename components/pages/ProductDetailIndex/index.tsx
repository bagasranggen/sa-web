import React from 'react';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Cards, { ThumbnailProps } from '@/components/common/Cards';
import Banner, { DetailProps } from '@/components/common/Banner';

export type ProductDetailIndexProps = {
    entries: {
        banner: DetailProps;
        recommendation: ThumbnailProps['items'];
    };
};

const ProductDetailIndex = ({ entries }: ProductDetailIndexProps): React.ReactElement => {
    return (
        <>
            {entries?.banner && (
                <Container
                    as="section"
                    className="mt-8">
                    <Banner.Detail {...entries.banner} />
                </Container>
            )}

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

                {entries?.recommendation && entries.recommendation.length > 0 && (
                    <Cards.Thumbnail items={entries.recommendation} />
                )}
            </Container>
        </>
    );
};

export default ProductDetailIndex;
