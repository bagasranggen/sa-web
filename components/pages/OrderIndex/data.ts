import { DELIVERY_ADDRESS_PICKUP } from '@/libs/constants';
import { PageDataParamsProps, PageDataProps, Product } from '@/libs/@types';
import { createProductItem } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { ORDER_INDEX_QUERY } from '@/graphql';

import { OrderIndexProps } from '@/components/pages/OrderIndex';

export const OrderData = async ({ typeHandle, uri }: PageDataParamsProps): Promise<PageDataProps<OrderIndexProps>> => {
    const { data } = await apolloClient().query({
        query: ORDER_INDEX_QUERY,
    });

    const products = (data as any)?.Products;

    const collection: OrderIndexProps['entries']['form']['collection'] = [
        {
            value: '',
            label: '-- Select Order --',
        },
    ];

    if (products?.docs && products.docs.length > 0) {
        products.docs.forEach((item: Product, i: number) => {
            const product = createProductItem({ item, index: i });

            if (product) collection.push({ value: product.slug, label: product.children as string });
        });
    }

    return {
        typeHandle,
        entries: {
            form: {
                collection,
                pickupAddress: DELIVERY_ADDRESS_PICKUP,
            },
        },
    };
};
