import { createArrayFromNumber } from '../factory/createArrayFromNumber';
import { createPicsumImage } from '../factory/createPicsumImage';
import { ThumbnailProps } from '@/components/common/Cards';

export const PRODUCT_LISTING: ThumbnailProps['items'] = createArrayFromNumber(8).map((_, i) => ({
    link: { href: '#' },
    media: [createPicsumImage({ id: 151 + i, width: 600, height: 800 })],
    colors: ['#FFC72C', '#4CD964'],
    price: 'Rp130,000/3day(s)',
    children: `Gema black - B0${26 + i}`,
}));

export const PRODUCT_LISTING_LOAD: ThumbnailProps['items'] = createArrayFromNumber(8).map((_, i) => ({
    link: { href: '#' },
    media: [createPicsumImage({ id: 159 + i, width: 600, height: 800 })],
    colors: ['#FFC72C', '#4CD964'],
    price: 'Rp130,000/3day(s)',
    children: `Gema black - B0${35 + i}`,
}));
