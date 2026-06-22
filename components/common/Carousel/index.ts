import { Component } from '@/libs/@types';

import Base, { BaseProps } from '@/components/common/Carousel/Base';
import Thumbnail, { ThumbnailProps } from '@/components/common/Carousel/Thumbnail';

export type * from '@/components/common/Carousel/Base';
export type * from '@/components/common/Carousel/Thumbnail';

type CarouselComposition = {
    Thumbnail: Component<ThumbnailProps>;
};

export default Object.assign<Component<BaseProps>, CarouselComposition>(Base, { Thumbnail });
