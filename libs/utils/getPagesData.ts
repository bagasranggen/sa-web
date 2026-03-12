import { HOMEPAGE_URI } from '@/libs/constants';
import { PageDataParamsProps, PageDataProps } from '@/libs/@types';

import { apolloClient } from '@/libs/fetchers';
import { PAGES_ENTRY_QUERY } from '@/graphql';

import { PAGES_HANDLES } from '@/components/pages/handles';
import { PAGES_DATA_HANDLES } from '@/components/pages/handlesData';

export type GetPagesDataProps = Pick<PageDataParamsProps, 'uri' | 'slug'>;

export const getPagesData = async ({ uri, slug }: GetPagesDataProps) => {
    let typeHandle = undefined;

    try {
        const { data } = await apolloClient().query({
            query: PAGES_ENTRY_QUERY,
            variables: {
                uri,
            },
        });

        if (data) {
            const pagesObj = Object.values(data);

            if (pagesObj && pagesObj.length > 0) {
                pagesObj.forEach((item) => {
                    if (!item?.docs) return;
                    if (item.docs.length === 0) return;
                    if (!item.docs[0]?.typeHandle) return;

                    typeHandle = item.docs[0].typeHandle;
                });
            }

            if (!typeHandle && uri === HOMEPAGE_URI) typeHandle = PAGES_HANDLES.HOMEPAGE;
            if (!typeHandle) typeHandle = PAGES_HANDLES.NOT_FOUND;
        }
    } catch (e) {
        throw new Error(e as any);
    }

    let dataProcessor: any = undefined;
    if (typeHandle && PAGES_DATA_HANDLES?.[typeHandle]) dataProcessor = PAGES_DATA_HANDLES[typeHandle];

    let data: PageDataProps<any> | undefined = undefined;

    if (typeHandle && dataProcessor) {
        try {
            data = dataProcessor({
                typeHandle,
                uri,
                slug,
            });
        } catch {}
    }

    return data;
};
