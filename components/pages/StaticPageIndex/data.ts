import { PageDataParamsProps, PageDataProps } from '@/libs/@types';
import { createContentBlocks } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { STATIC_PAGES_INDEX_QUERY } from '@/graphql';

import { StaticPageIndexProps } from '@/components/pages/StaticPageIndex';

export const StaticPageData = async ({
    typeHandle,
    uri,
}: PageDataParamsProps): Promise<PageDataProps<StaticPageIndexProps>> => {
    const { data } = await apolloClient().query({
        query: STATIC_PAGES_INDEX_QUERY,
        variables: {
            uri,
        },
    });

    const d = (data as any)?.Pages?.docs?.[0];

    return {
        typeHandle,
        entries: {
            header: 'Terms & Conditions',
            contentBlocks: createContentBlocks({ items: d?.contentBlocks?.blocks }),
        },
    };
};
