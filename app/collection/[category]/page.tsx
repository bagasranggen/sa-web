import React from 'react';

import ProductListingIndex from '@/components/pages/ProductListingIndex';
import { ProductListingData } from '@/components/pages/ProductListingIndex/data';

const Page = async ({}): Promise<React.ReactElement> => {
    const { entries } = await ProductListingData();

    return <ProductListingIndex entries={entries} />;
};

export default Page;
