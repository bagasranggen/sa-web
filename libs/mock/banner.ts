import {
    CAROUSEL_MEDIA_LIGHTBOX,
    CAROUSEL_MEDIA_PREVIEW,
    CAROUSEL_MEDIA_THUMB,
    SIZE_GUIDES_LIGHTBOX,
} from './carousel';
import { MARQUEE_HOMEPAGE } from './marquee';

import parse from 'html-react-parser';

import { DetailProps, HomepageProps } from '@/components/common/Banner';

export const BANNER_HOMEPAGE: HomepageProps = {
    media: MARQUEE_HOMEPAGE,
    description: parse(
        `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur corporis culpa eveniet, nobis perspiciatis rem!</p>`
    ),
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
    slug: 'gema',
    children: 'Gema black - B026',
};
