import { CAROUSEL_MEDIA_PREVIEW, CAROUSEL_MEDIA_THUMB } from './carousel';

export const BANNER_PRODUCT_INFO = [
    {
        title: 'Size',
        list: [{ label: 'Bust', value: '85-90cm' }],
    },
    {
        title: 'General Info',
        list: [{ label: 'Brand', value: 'Lyra' }],
    },
];

export const BANNER_PRODUCT_DETAIL = {
    info: BANNER_PRODUCT_INFO,
    carousel: {
        thumbnail: CAROUSEL_MEDIA_THUMB,
        media: CAROUSEL_MEDIA_PREVIEW,
    },
    price: 'Rp130,000/3day(s)',
    children: 'Gema black - B026',
};
