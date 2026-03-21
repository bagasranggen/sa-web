import { Product } from '@/libs/@types';
import { createPicsumImage } from '@/libs/factory/createPicsumImage';
import { createProductPrice } from '@/libs/factory/createProductPrice';
import { createPictureItem } from '@/libs/factory/createPictureItem';
import { checkMediaStatus } from '@/libs/utils/checkMediaStatus';

import { ThumbnailItemProps } from '@/components/common/Cards';

export type ProductColorItem = NonNullable<Product['colors']>[number];

export type CreateProductItemProps = {
    index?: number;
    item: Product;
    colorsFn?: (item: Exclude<ProductColorItem, number>) => void;
    withColors?: boolean;
};

export const createProductItem = ({
    index,
    item,
    colorsFn,
    withColors = true,
}: CreateProductItemProps): (ThumbnailItemProps & { slug: string }) | undefined => {
    if (!item?.url) return undefined;

    const colors: ThumbnailItemProps['colors'] = [];
    if (withColors && item?.colors && item.colors.length > 0) {
        item.colors.forEach((itm: NonNullable<Product['colors']>[number]) => {
            if (typeof itm !== 'number' && itm?.color) {
                colors.push(itm.color);

                if (colorsFn) colorsFn(itm);
            }
        });
    }

    const media: ThumbnailItemProps['media'] = [];

    if (item?.media && item.media.length > 0) {
        item.media.forEach((item) => {
            if (typeof item === 'number') return;

            const { data } = checkMediaStatus({
                item,
                volumeAssets: 'mediaProducts',
                handles: ['assets600x400', 'assets600x800'],
            });

            if (data?.['assets600x800']?.src) {
                media.push(
                    createPictureItem({
                        item: data['assets600x800'],
                        // media: data?.['assets600x400']?.src ? 768 : undefined,
                    })
                );
            }
            // if (data?.['assets600x400']?.src) {
            //     media.push(
            //         createPictureItem({
            //             item: data['assets600x400'],
            //             // media: data?.['assets600x400']?.src ? 768 : undefined,
            //         })
            //     );
            // }
        });
    }

    // if (media.length === 0) {
    //     media.push(
    //         ...[
    //             createPicsumImage({ id: 151 + 1, width: 600, height: 800, media: 768 }),
    //             createPicsumImage({ id: 151 + 1, width: 600, height: 450 }),
    //         ]
    //     );
    // }

    return {
        slug: item?.slug,
        link: { href: item.url },
        media,
        colors,
        price: createProductPrice(item?.prices?.[0]),
        children: item.title,
    };
};
