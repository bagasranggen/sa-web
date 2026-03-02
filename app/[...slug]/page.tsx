import React from 'react';

import { PageProps } from '@/libs/@types';
import { getPagesData, getUriFromParams } from '@/libs/utils';

import DynamicElement from '@/components/common/DynamicElement';
import { PAGES_INDEX_HANDLES } from '@/components/pages/handlesIndex';

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
