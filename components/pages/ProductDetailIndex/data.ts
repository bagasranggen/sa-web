import { CAROUSEL_MEDIA_PREVIEW, CAROUSEL_MEDIA_THUMB, PRODUCT_LISTING_NO_COLORS } from '@/libs/mock';
import { PageDataProps } from '@/libs/@types';

import { ProductDetailIndexProps } from '@/components/pages/ProductDetailIndex';

export const ProductDetailData = async (): Promise<PageDataProps<ProductDetailIndexProps>> => {
    const banner: ProductDetailIndexProps['entries']['banner'] = {
        info: [
            {
                title: 'Size',
                list: [{ label: 'Bust', value: '85-90cm' }],
            },
            {
                title: 'General Info',
                list: [{ label: 'Brand', value: 'Lyra' }],
            },
        ],
        carousel: {
            thumbnail: CAROUSEL_MEDIA_THUMB,
            media: CAROUSEL_MEDIA_PREVIEW,
        },
        price: 'Rp130,000/3day(s)',
        children: 'Gema black - B026',
    };

    const recommendation: ProductDetailIndexProps['entries']['recommendation'] = PRODUCT_LISTING_NO_COLORS;

    return {
        entries: {
            banner,
            recommendation,
        },
    };
};
