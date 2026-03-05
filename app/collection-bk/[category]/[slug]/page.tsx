import React from 'react';

import { PageProps } from '@/libs/@types';

import ProductDetailIndex from '@/components/pages/ProductDetailIndex';
import { ProductDetailData } from '@/components/pages/ProductDetailIndex/data';

const Page = async ({ params: paramsProps }: PageProps): Promise<React.ReactElement> => {
    const params = await paramsProps;

    console.log({ params });

    const { entries } = await ProductDetailData({});

    return <ProductDetailIndex entries={entries} />;
};

export default Page;
