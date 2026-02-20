import { BANNER_PRODUCT_DETAIL, PRODUCT_LISTING_NO_COLORS } from '@/libs/mock';
import { PageDataProps } from '@/libs/@types';

import { ProductDetailIndexProps } from '@/components/pages/ProductDetailIndex';

export const ProductDetailData = async (): Promise<PageDataProps<ProductDetailIndexProps>> => {
    const banner: ProductDetailIndexProps['entries']['banner'] = BANNER_PRODUCT_DETAIL;

    const recommendation: ProductDetailIndexProps['entries']['recommendation'] = PRODUCT_LISTING_NO_COLORS;

    return {
        entries: {
            banner,
            recommendation,
        },
    };
};
