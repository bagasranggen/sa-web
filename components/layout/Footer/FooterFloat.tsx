'use client';

import React, { Ref } from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { getEnv, joinArrayString } from '@/libs/utils';

import { useMeasure } from 'react-use';
import { MessageSquareText } from 'lucide-react';

import Button, { BaseAnchorProps } from '@/components/common/Button';
import Animation from '@/components/common/Animation';

export type FooterFloatProps = Pick<BaseAnchorProps, 'href' | 'target'>;

const FooterFloat = ({ href, target }: FooterFloatProps): React.ReactElement | null => {
    const { enableAnimation } = getEnv();
    const [ref, { height }] = useMeasure();

    let floatClass: ArrayStringProps = ['bottom-0 right-0 z-10 flex justify-end overflow-hidden'];
    if (!enableAnimation) floatClass.push('transition-opacity');
    if (height === 0 && !enableAnimation) floatClass.push('opacity-0');
    if (height === 0) floatClass.push('fixed');
    if (height > 0) floatClass.push('sticky -mt-(--height)');
    floatClass = joinArrayString(floatClass);

    let style: undefined | React.CSSProperties = undefined;
    if (height > 0) style = Object.assign(style ?? {}, { '--height': `${height}px` } as React.CSSProperties);

    if (!href) return null;

    return (
        <div
            ref={ref as Ref<HTMLDivElement>}
            style={style}
            className={floatClass}>
            <Animation
                type="fade"
                config={{ delay: 3, direction: 'left' }}>
                <div className="pb-2 pe-2">
                    <Button
                        as="anchor"
                        className="block p-1.5 rounded-full bg-sekar-secondary md:hover:bg-sekar-secondary/80"
                        href={href}
                        target={target}>
                        <MessageSquareText color="var(--color-light)" />
                    </Button>
                </div>
            </Animation>
        </div>
    );
};

export default FooterFloat;
