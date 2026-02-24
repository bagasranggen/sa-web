import { BaseAnimationConfigProps, BaseAnimationProps } from '@/libs/@types';

import { gsap } from 'gsap';

export type FadeConfigProps = {
    direction?: 'up' | 'left' | 'right';
} & Omit<BaseAnimationConfigProps, 'direction'>;

export type FadeProps = {
    config?: FadeConfigProps;
} & Omit<BaseAnimationProps, 'config'>;

export const fade = ({ element, config }: FadeProps) => {
    let fadeConfig = {};
    if (config?.direction === 'up') fadeConfig = Object.assign(fadeConfig, { y: 60 });
    if (config?.direction === 'left') fadeConfig = Object.assign(fadeConfig, { x: 60 });
    if (config?.direction === 'right') fadeConfig = Object.assign(fadeConfig, { x: -60 });

    const fromVars: gsap.TweenVars = {
        ease: 'Power1.easeInOut',
        opacity: 0,
        ...fadeConfig,
        onComplete: () => {
            if (config?.onComplete) config?.onComplete();
            gsap.set(element, { clearProps: 'y,opacity' });
        },
    };

    return gsap.from(element, fromVars);
};
