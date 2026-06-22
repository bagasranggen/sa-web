import { Navigation, Pagination, Thumbs } from 'swiper/modules';

import { BaseVariantProps } from '@/components/common/Carousel';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

export const ThumbnailThumbNavigation = () => {
    return (
        <div className="max-md:hidden">
            <Button className="swiper__navigation swiper__navigation--prev">
                <Icon.Chevron
                    direction="up"
                    withCircle={{ color: 'primary', size: 'sm' }}
                />
            </Button>

            <Button className="swiper__navigation swiper__navigation--next">
                <Icon.Chevron withCircle={{ color: 'primary', size: 'sm' }} />
            </Button>
        </div>
    );
};

export const ThumbnailThumbVariant: BaseVariantProps = {
    modules: [Thumbs, Navigation, Pagination],
    options: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 10,
        pagination: { clickable: true },
        navigation: {
            prevEl: '.swiper__navigation--prev',
            nextEl: '.swiper__navigation--next',
            disabledClass: 'opacity-40 pointer-events-none',
        },
        breakpoints: {
            0: {
                direction: 'horizontal',
                navigation: { enabled: false },
                pagination: { enabled: true },
            },
            768: {
                direction: 'vertical',
                navigation: { enabled: true },
                pagination: { enabled: false },
            },
        },
    },
};

export const ThumbnailPreviewNavigation = () => {
    return (
        <div className="swiper__navigation">
            <Button className="swiper__navigation--prev">
                <Icon.Arrow
                    direction="left"
                    withCircle={{ color: 'primary' }}
                />
            </Button>

            <Button className="swiper__navigation--next">
                <Icon.Arrow withCircle={{ color: 'primary', size: 'lg' }} />
            </Button>
        </div>
    );
};

export const ThumbnailPreviewVariant: BaseVariantProps = {
    modules: [Thumbs, Navigation],
    options: {
        navigation: {
            enabled: true,
            prevEl: '.swiper__navigation--prev',
            nextEl: '.swiper__navigation--next',
            disabledClass: 'opacity-40 pointer-events-none',
        },
        breakpoints: {
            0: {
                allowTouchMove: true,
            },
            768: {
                allowTouchMove: false,
            },
        },
    },
};
