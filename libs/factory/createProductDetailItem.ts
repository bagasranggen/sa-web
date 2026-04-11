import { Prettify, Product, Summaries } from '@/libs/@types';
import { checkMediaStatus, convertIntToCurrency } from '@/libs/utils';
import { createPictureItem } from '@/libs/factory/createPictureItem';

import { DetailProps } from '@/components/common/Banner';

export const createProductDetailItem = ({ item }: { item: Product }) => {
    let data: (Partial<DetailProps> & Partial<Pick<Product, 'slug'>>) | undefined = undefined;

    if (item && item?.title) {
        if (item?.title) data = Object.assign(data ?? {}, { children: item.title });
        if (item?.slug) data = Object.assign(data ?? {}, { slug: item.slug });

        const info: DetailProps['info'] = [];

        if (item?.shortDescription) {
            info.push({
                richText: item.shortDescription,
            });
        }

        if (item?.summaries && item.summaries.length > 0) {
            item.summaries.forEach((item: NonNullable<Summaries>[number]) => {
                const tmp: NonNullable<DetailProps['info']>[number]['list'] = [];

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

        if (info.length > 0) data = Object.assign(data ?? {}, { info });

        let price: DetailProps['price'] = undefined;
        if (item?.prices?.[0]) {
            const priceItem = item.prices[0];

            price = `${convertIntToCurrency(priceItem?.salePrice ?? priceItem.price, true)}/${priceItem.days}day(s)`;
        }

        if (price) data = Object.assign(data ?? {}, { price });

        let calendar: DetailProps['calendar'] = undefined;
        if (item?.bookedDates && item.bookedDates.length > 0) {
            const tmp: any = [];

            item.bookedDates.forEach((item: NonNullable<Product['bookedDates']>[number]) => {
                if (item?.from && item?.to) tmp.push({ from: new Date(item.from), to: new Date(item.to) });
                if (item?.from && !item?.to) tmp.push(new Date(item.from));
            });

            if (tmp.length > 0) calendar = Object.assign(calendar ?? {}, { disabled: tmp });
        }

        if (calendar) data = Object.assign(data ?? {}, { calendar });

        let carousel: DetailProps['carousel'] = undefined;

        if (item?.media && item.media.length > 0) {
            type Carousel = NonNullable<DetailProps['carousel']>;

            const carouselMedia: Carousel['media'] = [];
            const carouselThumb: Carousel['thumbnail'] = [];
            const carouselLightbox: Carousel['lightbox'] = [];

            item.media.forEach((item) => {
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
                            // media: media?.['assets600x400']?.src ? 768 : undefined,
                        })
                    );
                }
                // if (media?.['assets600x400']?.src) {
                //     tmpMedia.push(createPictureItem({ item: media?.['assets600x400'] }));
                // }

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

                // Carousel Lightbox
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

        if (carousel) data = Object.assign(data ?? {}, { carousel });

        const sizeGuides: DetailProps['sizeGuides'] = [];

        if (item?.mediaSizeGuides && item.mediaSizeGuides.length > 0) {
            item.mediaSizeGuides.forEach((item) => {
                const tmp: NonNullable<DetailProps['sizeGuides']>[number] = [];

                if (typeof item === 'number') return;
                if (!item?.url) return;

                const { data } = checkMediaStatus({
                    item,
                    volumeAssets: 'mediaProducts',
                    handles: ['assets600x800'],
                });

                if (data) tmp.push(createPictureItem({ item: data, media: 768 }));
                if (data?.['assets600x800']?.src) tmp.push(createPictureItem({ item: data?.['assets600x800'] }));

                if (tmp.length > 0) sizeGuides.push(tmp);
            });
        }

        if (sizeGuides.length > 0) data = Object.assign(data ?? {}, { sizeGuides });
    }

    return data;
};
