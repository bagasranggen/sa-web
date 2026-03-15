import { PRODUCT_LISTING_NO_COLORS, SIZE_GUIDES_LIGHTBOX } from '@/libs/mock';
import { PageDataParamsProps, PageDataProps, Prettify, Product, Summaries } from '@/libs/@types';
import { checkMediaStatus, convertIntToCurrency } from '@/libs/utils';
import { createPictureItem } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { PRODUCT_DETAIL_INDEX_QUERY } from '@/graphql';

import { ProductDetailIndexProps } from '@/components/pages/ProductDetailIndex';

export const ProductDetailData = async ({
    typeHandle,
    uri,
}: PageDataParamsProps): Promise<PageDataProps<ProductDetailIndexProps>> => {
    const { data } = await apolloClient().query({
        query: PRODUCT_DETAIL_INDEX_QUERY,
        variables: { uri },
    });

    const d: Product = (data as any)?.Products?.docs?.[0];

    let banner: ProductDetailIndexProps['entries']['banner'] = undefined;

    if (d?.title) {
        const info: NonNullable<ProductDetailIndexProps['entries']['banner']>['info'] = [];
        if (d?.summaries && d.summaries.length > 0) {
            d.summaries.forEach((item: NonNullable<Summaries>[number]) => {
                const tmp: NonNullable<
                    NonNullable<ProductDetailIndexProps['entries']['banner']>['info']
                >[number]['list'] = [];

                if (item && item?.details && item.details.length > 0) {
                    item.details.forEach((itm: NonNullable<NonNullable<Summaries>[number]['details']>[number]) => {
                        if (!itm?.value) return;
                        if (!itm?.label || typeof itm.label === 'number' || !itm?.label?.title) return;

                        tmp.push({
                            label: itm.label.title,
                            value: itm.value,
                        });
                    });
                }

                if (tmp.length === 0 && !item?.title) return;

                info.push({
                    title: item.title,
                    list: tmp,
                });
            });
        }

        let price: NonNullable<ProductDetailIndexProps['entries']['banner']>['price'] = undefined;
        if (d?.prices?.[0]) {
            const priceItem = d.prices[0];

            price = `${convertIntToCurrency(priceItem?.salePrice ?? priceItem.price, true)}/${priceItem.days}day(s)`;
        }

        let calendar: NonNullable<ProductDetailIndexProps['entries']['banner']>['calendar'] = undefined;
        if (d?.bookedDates && d.bookedDates.length > 0) {
            const tmp: any = [];

            d.bookedDates.forEach((item: NonNullable<Product['bookedDates']>[number]) => {
                if (item?.from && item?.to) tmp.push({ from: new Date(item.from), to: new Date(item.to) });
                if (item?.from && !item?.to) tmp.push(new Date(item.from));
            });

            if (tmp.length > 0) calendar = Object.assign(calendar ?? {}, { disabled: tmp });
        }

        let carousel: NonNullable<ProductDetailIndexProps['entries']['banner']>['carousel'] = undefined;

        if (d?.media && d.media.length > 0) {
            type Carousel = NonNullable<NonNullable<ProductDetailIndexProps['entries']['banner']>['carousel']>;

            const carouselMedia: Carousel['media'] = [];
            const carouselThumb: Carousel['thumbnail'] = [];
            const carouselLightbox: Carousel['lightbox'] = [];

            d.media.forEach((item) => {
                const tmpMedia: Prettify<NonNullable<Carousel['media']>[number]> = [];
                const tmpThumb: Prettify<NonNullable<Carousel['thumbnail']>[number]> = [];
                const tmpLightbox: Prettify<NonNullable<Carousel['lightbox']>[number]> = [];

                if (typeof item === 'number') return;

                const { data: media } = checkMediaStatus({
                    item,
                    volumeAssets: 'mediaProducts',
                    handles: [
                        'assets1000xauto',
                        'assets1000x1400',
                        'assets600x400',
                        'assets600x800',
                        'assets400x560',
                        'assets300x300',
                    ],
                });

                // Carousel Preview
                if (media?.['assets1000x1400']?.src) {
                    tmpMedia.push(
                        createPictureItem({
                            item: media?.['assets1000x1400'],
                            media: media?.['assets600x400']?.src ? 768 : undefined,
                        })
                    );
                }
                if (media?.['assets600x400']?.src) {
                    tmpMedia.push(createPictureItem({ item: media?.['assets600x400'] }));
                }

                // Carousel Thumbnail
                if (media?.['assets400x560']?.src) {
                    tmpThumb.push(
                        createPictureItem({
                            item: media?.['assets400x560'],
                            media: media?.['assets300x300']?.src ? 768 : undefined,
                        })
                    );
                }
                if (media?.['assets300x300']?.src) {
                    tmpThumb.push(createPictureItem({ item: media?.['assets300x300'] }));
                }

                // Carousel Lighbox
                if (media?.['assets1000xauto']?.src) {
                    tmpLightbox.push(
                        createPictureItem({
                            item: media?.['assets1000xauto'],
                            media: media?.['assets600x800']?.src ? 768 : undefined,
                        })
                    );
                }
                if (media?.['assets600x800']?.src) {
                    tmpLightbox.push(createPictureItem({ item: media?.['assets600x800'] }));
                }

                if (tmpMedia.length > 0) carouselMedia.push(tmpMedia);
                if (tmpThumb.length > 0) carouselThumb.push(tmpThumb);
                if (tmpLightbox.length > 0) carouselLightbox.push(tmpLightbox);
            });

            if (carouselMedia.length > 0) carousel = Object.assign(carousel ?? {}, { media: carouselMedia });
            if (carouselThumb.length > 0) carousel = Object.assign(carousel ?? {}, { thumbnail: carouselThumb });
            if (carouselLightbox.length > 0) carousel = Object.assign(carousel ?? {}, { lightbox: carouselLightbox });
        }

        banner = Object.assign(banner ?? {}, {
            info,
            carousel,
            price,
            calendar,
            sizeGuides: SIZE_GUIDES_LIGHTBOX,
            button: {
                href: `/order?collection=${d?.slug}`,
            },
            children: d.title,
        });
    }

    const recommendation: ProductDetailIndexProps['entries']['recommendation'] = PRODUCT_LISTING_NO_COLORS;

    return {
        typeHandle,
        entries: {
            banner,
            recommendation,
        },
    };
};
