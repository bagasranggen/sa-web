import { BaseAnimationConfigProps, BaseAnimationProps } from '@/libs/@types';
import { getAnimationElement } from '@/libs/utils';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type FadeConfigProps = {
    direction?: 'up' | 'left' | 'right';
} & (Omit<BaseAnimationConfigProps, 'direction'> & Pick<gsap.TweenVars, 'delay'>);

export type FadeProps = {
    config?: FadeConfigProps;
} & Omit<BaseAnimationProps, 'config'>;

export const fade = ({ element, config }: FadeProps) => {
    const el = getAnimationElement(element);

    let fadeConfig = {};
    if (config?.direction === 'up') fadeConfig = Object.assign(fadeConfig, { y: 60 });
    if (config?.direction === 'left') fadeConfig = Object.assign(fadeConfig, { x: 60 });
    if (config?.direction === 'right') fadeConfig = Object.assign(fadeConfig, { x: -60 });
    if (config?.delay && typeof config.delay === 'number') {
        fadeConfig = Object.assign(fadeConfig, { delay: config.delay });
    }
    if (config?.delay && typeof config.delay === 'string') {
        const isInViewport = ScrollTrigger.isInViewport(el);
        const tl = gsap.getById(config.delay);
        const duration = tl?.duration() ?? 0;
        const offsetDuration = duration / 1.5;
        const delay = duration - offsetDuration;

        if (isInViewport && duration && duration > 0) fadeConfig = Object.assign(fadeConfig, { delay });
    }

    const fromVars: gsap.TweenVars = {
        // ease: 'Power1.easeInOut',
        opacity: 0,
        ...fadeConfig,
        onComplete: () => {
            if (config?.onComplete) config?.onComplete();
            gsap.set(el, { clearProps: 'y,opacity' });
        },
    };

    return gsap.from(element, fromVars);
};
