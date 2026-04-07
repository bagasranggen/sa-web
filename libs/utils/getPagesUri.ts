import { Product } from '@/libs/@types';

import { apolloClient } from '@/libs/fetchers';
import { PAGES_ENTRY_QUERY } from '@/graphql';

import { PAGES_HANDLES } from '@/components/pages/handles';

export type GetPagesUriProps = {
    typeHandles: string[];
};

export const getPagesUri = async ({ typeHandles }: GetPagesUriProps) => {
    const uris = [{ slug: [''] }];

    // const { data } = await apolloClient().query({
    //     query: PAGES_ENTRY_QUERY,
    // });

    // console.log({ data });

    if (typeHandles && typeHandles.length > 0) {
        for (const item of typeHandles) {
            try {
                const isSectionProducts = item === PAGES_HANDLES.PRODUCT_DETAIL;

                let variables = {
                    [isSectionProducts ? 'productsTypeHandle' : 'pagesTypeHandle']: item,
                };

                // if(item !== PAGES_HANDLES.PRODUCT_DETAIL) variables = Object.assign(variables, { pagesTypeHandle: item });
                // if(item === PAGES_HANDLES.PRODUCT_DETAIL) variables = Object.assign(variables, { productsTypeHandle: item });

                const { data } = (await apolloClient().query({
                    query: PAGES_ENTRY_QUERY,
                    variables,
                })) as any;

                if (data?.Products && data.Products.docs.length > 0) {
                    data.Products.docs.forEach((product: Product) => {
                        if (product?.uri && product.uri.length > 0) uris.push({ slug: product.uri.split('/') });
                        // uris.push({ slug: [product.slug] });
                    });
                }

                // console.log({ type: item, data });
                // console.log({ product: data?.Products?.docs });
            } catch (e) {
                console.log(e);
            }

            // console.log({ item });
        }
    }

    // console.log({ uris });

    // return [
    //     { slug: [''] },
    //     { slug: ['collection'] },
    //     { slug: ['collection', 'prom'] },
    //     { slug: ['collection', 'wedding-guest'] },
    // ];

    return uris;
};
