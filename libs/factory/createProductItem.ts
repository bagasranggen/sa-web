import { ArrayStringProps, Product } from '@/libs/@types';
import { createProductPrice } from '@/libs/factory/createProductPrice';
import { createPictureItem } from '@/libs/factory/createPictureItem';
import { checkMediaStatus } from '@/libs/utils/checkMediaStatus';
import { joinArrayString } from '@/libs/utils/joinArrayString';
import { sortLexicoArrayObject } from '@/libs/utils/sortLexicoArrayObject';

import { ThumbnailItemProps } from '@/components/common/Cards';

export type ProductColorItem = NonNullable<Product['colors']>[number];

export type CreateProductItemProps = {
    index?: number;
    item: Product;
    colorsFn?: (item: Exclude<ProductColorItem, number>) => void;
    withColors?: boolean;
};

export const createProductItem = ({
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

    let badge: ThumbnailItemProps['badge'] = undefined;
    if (item?.tag && typeof item?.tag !== 'number') badge = item.tag.title;

    const sizesSorted = sortLexicoArrayObject({
        items: item?.sizes ? [...item.sizes] : [],
        key: '_order',
    }) as Product['sizes'];
    let sizes: ArrayStringProps = [];
    if (sizesSorted && sizesSorted.length > 0) {
        sizesSorted.forEach((item, i: number, arr) => {
            if (typeof item === 'number') return;
            if (!Array.isArray(sizes)) return;

            if (item?.slug && (i === 0 || i === arr.length - 1)) sizes.push(item.slug);
        });
    }
    sizes = joinArrayString(sizes, ' - ');

    return {
        slug: item?.slug,
        link: { href: item.url },
        media,
        colors,
        badge,
        sizes,
        price: createProductPrice(item?.prices?.[0]),
        children: item.title,
    };
};
