import { Component } from '@/libs/@types';

import Base, { BaseProps } from '@/components/common/Carousel/Base';

export type * from '@/components/common/Carousel/Base';

type CarouselComposition = {};

export default Object.assign<Component<BaseProps>, CarouselComposition>(Base, {});
