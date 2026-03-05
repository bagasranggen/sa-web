import { Product } from '@/libs/@types';
import { createPicsumImage } from '@/libs/factory/createPicsumImage';
import { createProductPrice } from '@/libs/factory/createProductPrice';

import { ThumbnailItemProps } from '@/components/common/Cards';

export type ProductColorItem = NonNullable<Product['colors']>[number];

export type CreateProductItemProps = {
    index?: number;
    item: Product;
    colorsFn?: (item: Exclude<ProductColorItem, number>) => void;
};

export const createProductItem = ({
    index,
    item,
    colorsFn,
}: CreateProductItemProps): ThumbnailItemProps | undefined => {
    if (!item?.url) return undefined;

    const colors: ThumbnailItemProps['colors'] = [];
    if (item?.colors && item.colors.length > 0) {
        item.colors.forEach((itm: NonNullable<Product['colors']>[number]) => {
            if (typeof itm !== 'number' && itm?.color) {
                colors.push(itm.color);

                if (colorsFn) colorsFn(itm);
            }
        });
    }

    return {
        link: { href: item.url },
        media: [
            createPicsumImage({ id: 151 + (index ?? 1), width: 600, height: 800, media: 768 }),
            createPicsumImage({ id: 151 + (index ?? 1), width: 600, height: 450 }),
        ],
        colors,
        price: createProductPrice(item?.prices?.[0]),
        children: item.title,
    };
};
