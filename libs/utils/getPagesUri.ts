import { Category, Page, Product } from '@/libs/@types';
import { getEnv } from '@/libs/utils/getEnv';

import { apolloClient, OperationVariables } from '@/libs/fetchers';
import { CATEGORY_ENTRY_QUERY, PAGES_ENTRY_QUERY } from '@/graphql';

import { PAGES_HANDLES } from '@/components/pages/handles';

export type GetPagesUriProps = {
    typeHandles?: string[];
};

export const getPagesUri = async ({ typeHandles }: GetPagesUriProps) => {
    const { prerenderLimitProducts, prerenderLimitPages } = getEnv();

    const uris = [{ slug: [''] }];

    const getUri = async ({ variables }: { variables: OperationVariables }) => {
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
    };

    if (typeHandles && typeHandles.length > 0) {
        for (const item of typeHandles) {
            let limit: undefined | number = undefined;

            try {
                const isSectionProducts = item === PAGES_HANDLES.PRODUCT_DETAIL;

                if (isSectionProducts) {
                    if (prerenderLimitProducts && prerenderLimitProducts > 0) limit = prerenderLimitProducts;

                    const categories: number[] = [];

                    try {
                        const { data } = (await apolloClient().query({
                            query: CATEGORY_ENTRY_QUERY,
                        })) as any;

                        const categoriesData = data?.Categories?.docs;

                        if (categoriesData && categoriesData.length > 0) {
                            categoriesData.forEach((category: Category) => {
                                if (category?.id) categories.push(category.id);
                            });
                        }
                    } catch {}

                    if (categories.length > 0) {
                        for (const category of categories) {
                            await getUri({
                                variables: {
                                    limit,
                                    productsTypeHandle: item,
                                    pagesTypeInclude: false,
                                    productsCategory: category,
                                },
                            });
                        }
                    }
                }

                if (!isSectionProducts) {
                    if (prerenderLimitPages && prerenderLimitPages > 0) limit = prerenderLimitPages;

                    await getUri({
                        variables: {
                            limit,
                            pagesTypeHandle: item,
                            productsTypeInclude: false,
                        },
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    return uris;
};
