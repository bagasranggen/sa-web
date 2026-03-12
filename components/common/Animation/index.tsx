'use client';

import React, { cloneElement, RefObject, useRef } from 'react';

import { AnimationProps as BaseAnimationProps } from '@/libs/@types';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { registerAnimation } from '@/components/common/Animation/register';

gsap.registerPlugin(useGSAP);

registerAnimation();

export type AnimationProps = {
    as?: string;
    children: React.ReactElement;
    trigger?: number | boolean;
} & (BaseAnimationProps & Partial<Pick<HTMLElement, 'id'>>);

const Animation = ({ as, type, children, trigger, id, ...props }: AnimationProps): React.ReactElement => {
    let animationRef = useRef<HTMLElement | null>(null);
    if ('ref' in children && children?.ref) animationRef = children?.ref as RefObject<HTMLElement | null>;

    let animationProps: any = { ref: animationRef };

    if (type && !as) {
        // eslint-disable-next-line react-hooks/refs
        animationProps = Object.assign(animationProps, { 'data-animation': type });
    }

    if (type && as) {
        // eslint-disable-next-line react-hooks/refs
        animationProps = Object.assign(animationProps, { [`data-animation-${type}`]: as });
    }

    let config = {};
    if ('config' in props && props?.config) config = Object.assign(config, props?.config);

    useGSAP(
        () => {
            if (as) return;
            if (!type) return;
            if (type && !gsap.effects[type]) {
                console.warn({
                    message: `animation ${type} is not registered`,
                    from: animationRef.current,
                });
                return;
            }

            gsap.effects[type](animationProps.ref.current, config, id);
        },
        { scope: animationProps.ref, dependencies: [type, as, trigger] }
    );

    // eslint-disable-next-line react-hooks/refs
    return cloneElement(children, animationProps);
};

export default Animation;

export type * from '@/components/common/Animation/handles';
