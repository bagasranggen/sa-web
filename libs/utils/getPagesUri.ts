import { Page, Product } from '@/libs/@types';
import { getEnv } from '@/libs/utils/getEnv';

import { apolloClient, OperationVariables } from '@/libs/fetchers';
import { PAGES_ENTRY_QUERY } from '@/graphql';

import { PAGES_HANDLES } from '@/components/pages/handles';

export type GetPagesUriProps = {
    typeHandles?: string[];
};

export const getPagesUri = async ({ typeHandles }: GetPagesUriProps) => {
    const { prerenderLimitProducts, prerenderLimitPages } = getEnv();

    const uris = [{ slug: [''] }];

    if (typeHandles && typeHandles.length > 0) {
        for (const item of typeHandles) {
            let limit: undefined | number = undefined;

            try {
                const isSectionProducts = item === PAGES_HANDLES.PRODUCT_DETAIL;

                if (isSectionProducts) limit = prerenderLimitProducts;
                if (!isSectionProducts) limit = prerenderLimitPages;

                let variables: OperationVariables = { limit };
                if (isSectionProducts) {
                    variables = Object.assign(variables, {
                        productsTypeHandle: item,
                        pagesTypeInclude: false,
                    });
                }
                if (!isSectionProducts) {
                    variables = Object.assign(variables, {
                        pagesTypeHandle: item,
                        productsTypeInclude: false,
                    });
                }

                const { data } = (await apolloClient().query({
                    query: PAGES_ENTRY_QUERY,
                    variables,
                })) as any;

                let docs = [];
                if (data?.Products && data.Products.docs.length > 0) docs = data.Products.docs;
                if (data?.Pages && data.Pages.docs.length > 0) docs = data.Pages.docs;

                if (docs.length > 0) {
                    docs.forEach((itm: Product | Page) => {
                        if (itm?.uri && itm.uri.length > 0) uris.push({ slug: itm.uri.split('/') });
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    return uris;
};
