import { Footer, PageDataParamsProps, PageDataProps, Product } from '@/libs/@types';
import { createLinkItem, createProductItem } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { ORDER_INDEX_QUERY } from '@/graphql';

import { OrderIndexProps } from '@/components/pages/OrderIndex';

export const OrderData = async ({ typeHandle, uri }: PageDataParamsProps): Promise<PageDataProps<OrderIndexProps>> => {
    const { data } = await apolloClient().query({
        query: ORDER_INDEX_QUERY,
    });

    const products = (data as any)?.Products;
    const footer: Footer = (data as any)?.Footer;

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

    const { linkIsValid, link } = createLinkItem(footer?.locationLink);
    let pickupAddress: OrderIndexProps['entries']['form']['pickupAddress'] = undefined;

    if (linkIsValid && link) {
        pickupAddress = Object.assign(pickupAddress ?? {}, {
            title: footer?.locationTitle,
            ...link,
            children: footer?.locationAddress,
        });
    }

    return {
        typeHandle,
        entries: {
            form: {
                collection,
                pickupAddress,
            },
        },
    };
};
