import React, { PropsWithChildren } from 'react';

import Loader from '@/components/common/Loader';
import DynamicWrapper from '@/components/common/DynamicWrapper';

export type ProductListingWrapperProps = {
    isLoading?: boolean;
} & PropsWithChildren;

const ProductListingWrapper = ({ isLoading, children }: ProductListingWrapperProps): React.ReactElement => {
    return (
        <DynamicWrapper
            as={isLoading ? 'div' : undefined}
            className="relative after:content-[''] after:absolute after:z-10 after:top-0 after:w-full after:h-full after:backdrop-blur-[.4rem] after:bg-light/30">
            {isLoading && (
                <Loader className="flex flex-col items-center mb-[calc((57px+4rem)*-1)] sticky top-1/2 z-20">
                    Loading
                </Loader>
            )}

            {children}
        </DynamicWrapper>
    );
};

export default ProductListingWrapper;
