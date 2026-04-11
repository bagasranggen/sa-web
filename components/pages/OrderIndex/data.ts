import { Global, PageDataParamsProps, PageDataProps, Product } from '@/libs/@types';
import { createLinkItem, createProductDetailItem } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { ORDER_INDEX_QUERY } from '@/graphql';

import { OrderIndexProps } from '@/components/pages/OrderIndex';

export const OrderData = async ({ typeHandle, uri }: PageDataParamsProps): Promise<PageDataProps<OrderIndexProps>> => {
    const { data } = await apolloClient().query({
        query: ORDER_INDEX_QUERY,
    });

    const products = (data as any)?.Products;
    const global: Global = (data as any)?.Global;

    const formProducts: OrderIndexProps['entries']['form']['products'] = [];

    const collection: OrderIndexProps['entries']['form']['collection'] = [
        {
            value: '',
            label: '-- Select Order --',
        },
    ];

    if (products?.docs && products.docs.length > 0) {
        products.docs.forEach((item: Product, i: number) => {
            const detail = createProductDetailItem({ item });

            if (detail && detail?.children && detail?.slug) {
                formProducts.push({
                    title: detail.children as string,
                    slug: detail?.slug,
                    disabled: detail?.calendar?.disabled,
                });

                collection.push({
                    value: detail.slug,
                    label: detail.children as string,
                });
            }
        });
    }

    const { linkIsValid, link } = createLinkItem(global?.locationLink);
    let pickupAddress: OrderIndexProps['entries']['form']['pickupAddress'] = undefined;

    if (linkIsValid && link) {
        pickupAddress = Object.assign(pickupAddress ?? {}, {
            title: global?.locationTitle,
            ...link,
            children: global?.locationAddress,
        });
    }

    return {
        typeHandle,
        entries: {
            form: {
                products: formProducts,
                collection,
                pickupAddress,
            },
        },
    };
};
