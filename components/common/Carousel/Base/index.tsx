'use client';

import React, { PropsWithChildren } from 'react';

import { SwiperModule, SwiperOptions } from 'swiper/types';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

export type BaseVariantProps = {
    modules?: SwiperModule | SwiperModule[];
    options?: SwiperOptions;
    element?: React.ReactElement;
};

export type BaseItemProps = PropsWithChildren;

export type BaseProps = {
    items: BaseItemProps[];
    modulesVariant?: BaseVariantProps;
} & SwiperProps;

const Base = ({ items, autoplay, modulesVariant, modules: modulesProps, ...props }: BaseProps): React.ReactElement => {
    const modules: SwiperModule[] = [];
    if (autoplay) modules.push(Autoplay);
    if (modulesVariant?.modules && Array.isArray(modulesVariant.modules)) modules.push(...modulesVariant.modules);
    if (modulesVariant?.modules && !Array.isArray(modulesVariant.modules)) modules.push(modulesVariant.modules);
    if (modulesProps && Array.isArray(modulesProps) && modulesProps.length > 0) modules.push(...modulesProps);

    let swiperProps: SwiperProps = props;
    if (modulesVariant?.options) swiperProps = { ...swiperProps, ...modulesVariant.options };

    return (
        <Swiper
            modules={modules}
            {...swiperProps}>
            {items.map((item: BaseItemProps, i: number) => (
                <SwiperSlide key={i}>{item.children}</SwiperSlide>
            ))}

            {modulesVariant?.element && modulesVariant.element}
        </Swiper>
    );
};

export default Base;
