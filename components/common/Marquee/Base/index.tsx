'use client';

import React, { PropsWithChildren, Ref, Fragment, ExoticComponent, FragmentProps } from 'react';

import { ArrayStringProps, ClassnameProps, Component } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';
import { createArrayFromNumber } from '@/libs/factory';

import { useWindowSize, useMeasure } from 'react-use';

import Animation from '@/components/common/Animation';
import BaseItem from '@/components/common/Marquee/Base/BaseItem';
import Container, { ContainerProps } from '@/components/common/Container';

export type BaseProps = {
    withContainer?: boolean;
} & (PropsWithChildren & ClassnameProps);

const Base = ({ className, withContainer, children }: BaseProps): React.ReactElement => {
    const { width: windowWidth } = useWindowSize();
    const [textRef, { width: textWidth }] = useMeasure();

    let repeat = 0;
    if (windowWidth > 0 && textWidth > 0) repeat = Math.ceil((windowWidth * 2) / textWidth);

    let marqueeClass: ArrayStringProps = ['marquee'];
    if (className) marqueeClass.push(className);
    marqueeClass = joinArrayString(marqueeClass);

    let MarqueeContainer: ExoticComponent<FragmentProps> | Component<ContainerProps> = Fragment;
    if (withContainer) MarqueeContainer = Container;

    return (
        <Animation
            type="marquee"
            trigger={repeat}>
            <div className={marqueeClass}>
                <MarqueeContainer>
                    <Animation
                        type="marquee"
                        as="wrapper">
                        <div className="marquee__wrapper">
                            <Animation
                                type="marquee"
                                as="item">
                                <BaseItem ref={textRef as Ref<HTMLDivElement>}>{children}</BaseItem>
                            </Animation>

                            {createArrayFromNumber(repeat).map((_, i: number) => {
                                return (
                                    <Animation
                                        key={i}
                                        type="marquee"
                                        as="item">
                                        <BaseItem>{children}</BaseItem>
                                    </Animation>
                                );
                            })}
                        </div>
                    </Animation>
                </MarqueeContainer>
            </div>
        </Animation>
    );
};

export default Base;
