import {
    CAROUSEL_MEDIA_LIGHTBOX,
    CAROUSEL_MEDIA_PREVIEW,
    CAROUSEL_MEDIA_THUMB,
    SIZE_GUIDES_LIGHTBOX,
} from '@/libs/mock/carousel';
import { MARQUEE_HOMEPAGE } from '@/libs/mock/marquee';
import { RICH_TEXT_SHORT } from '@/libs/mock/text';

import parse from 'html-react-parser';

import { DetailProps, HomepageProps } from '@/components/common/Banner';

export const BANNER_HOMEPAGE: HomepageProps = {
    media: MARQUEE_HOMEPAGE,
    description: RICH_TEXT_SHORT,
    children: parse(` Lorem ipsum dolor sit amet, consectetur adipisicing elit.`),
};

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

export const BANNER_PRODUCT_DETAIL: DetailProps = {
    info: BANNER_PRODUCT_INFO,
    carousel: {
        thumbnail: CAROUSEL_MEDIA_THUMB,
        media: CAROUSEL_MEDIA_PREVIEW,
        lightbox: CAROUSEL_MEDIA_LIGHTBOX,
    },
    sizeGuides: SIZE_GUIDES_LIGHTBOX,
    price: 'Rp130,000/3day(s)',
    button: {
        href: '/order?collection=gema',
    },
    children: 'Gema black - B026',
};
