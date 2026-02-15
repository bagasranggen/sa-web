import React from 'react';

import ProductDetailIndex from '@/components/pages/ProductDetailIndex';
import { ProductDetailData } from '@/components/pages/ProductDetailIndex/data';

const Page = async ({}): Promise<React.ReactElement> => {
    const { entries } = await ProductDetailData();

    return <ProductDetailIndex entries={entries} />;
};

export default Page;
