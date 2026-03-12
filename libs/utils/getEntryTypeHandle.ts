import { HOMEPAGE_URI } from '@/libs/constants';
import { PageDataParamsProps } from '@/libs/@types';

import { apolloClient } from '@/libs/fetchers';
import { PAGES_ENTRY_QUERY } from '@/graphql';

import { PAGES_HANDLES } from '@/components/pages/handles';

export type GetEntryTypeHandle = Pick<PageDataParamsProps, 'uri'>;

export const getEntryTypeHandle = async ({ uri }: GetEntryTypeHandle) => {
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

    return typeHandle;
};
