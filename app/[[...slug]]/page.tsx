import React from 'react';
import { Metadata } from 'next';

import { PageProps } from '@/libs/@types';
import { getPagesData, getPagesUri, getUriFromParams } from '@/libs/utils';

import DynamicElement from '@/components/common/DynamicElement';
import { PAGES_INDEX_HANDLES } from '@/components/pages/handlesIndex';
import { PAGES_HANDLES } from '@/components/pages/handles';

export const generateStaticParams = async () => {
    return await getPagesUri({
        typeHandles: [
            PAGES_HANDLES.PRODUCT_DETAIL,
            PAGES_HANDLES.PRODUCT_LISTING,
            PAGES_HANDLES.PRODUCT_CATEGORIES,
            PAGES_HANDLES.STATIC_PAGES,
        ],
    });
};

export const generateMetadata = async ({ params: paramsProps }: PageProps): Promise<Metadata | null> => {
    const params = await paramsProps;
    const { uri, slug } = getUriFromParams(params?.slug);

    const data = await getPagesData({ uri, slug });
    const meta = data?.meta;

    if (!meta) return null;

    return {
        title: meta?.title,
        description: meta?.description,
        openGraph: {
            type: 'website',
            title: meta?.title,
            description: meta?.description,
        },
    };
};

const Page = async ({ params: paramsProps }: PageProps): Promise<React.ReactElement> => {
    const params = await paramsProps;
    const { uri, slug } = getUriFromParams(params?.slug);

    const data = await getPagesData({ uri, slug });

    return (
        <DynamicElement
            handles={data?.typeHandle}
            component={PAGES_INDEX_HANDLES?.[data?.typeHandle as keyof typeof PAGES_INDEX_HANDLES] as any}
            props={data}
        />
    );
};

export default Page;
