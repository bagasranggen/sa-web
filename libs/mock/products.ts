import { createArrayFromNumber } from '../factory/createArrayFromNumber';
import { createPicsumImage } from '../factory/createPicsumImage';
import { ThumbnailProps } from '@/components/common/Cards';

export const PRODUCT_LISTING: ThumbnailProps['items'] = createArrayFromNumber(8).map((_, i) => ({
    link: { href: '/collection/formal/gema' },
    media: [
        createPicsumImage({ id: 151 + i, width: 600, height: 800, media: 768 }),
        createPicsumImage({ id: 151 + i, width: 600, height: 450 }),
    ],
    colors: ['#FFC72C', '#4CD964'],
    price: 'Rp130,000/3day(s)',
    children: `Gema black - B0${26 + i}`,
}));

export const PRODUCT_LISTING_LOAD: ThumbnailProps['items'] = createArrayFromNumber(8).map((_, i) => ({
    link: { href: '/collection/formal/gema-a' },
    media: [
        createPicsumImage({ id: 159 + i, width: 600, height: 800, media: 768 }),
        createPicsumImage({ id: 159 + i, width: 600, height: 450 }),
    ],
    colors: ['#FFC72C', '#4CD964'],
    price: 'Rp130,000/3day(s)',
    children: `Gema black - B0${35 + i}`,
}));

export const PRODUCT_LISTING_NO_COLORS: ThumbnailProps['items'] = createArrayFromNumber(4).map((_, i) => ({
    link: { href: '/collection/formal/gema-c' },
    media: [
        createPicsumImage({ id: 159 + i, width: 600, height: 800, media: 768 }),
        createPicsumImage({ id: 159 + i, width: 600, height: 450 }),
    ],
    // colors: ['#FFC72C', '#4CD964'],
    price: 'Rp130,000/3day(s)',
    children: `Gema black - B0${35 + i}`,
}));
