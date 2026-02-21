import { BaseAnimationProps } from '@/libs/@types';
import { delay, getAnimationElement, getElementDimension } from '@/libs/utils';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type MarqueeConfigProps = {
    speed?: number;
    direction?: 'left' | 'right';
};

export type MarqueeProps = {
    config?: MarqueeConfigProps;
} & Omit<BaseAnimationProps, 'config'>;

export const marquee = async ({ element, config }: MarqueeProps) => {
    await delay({ ms: 80 });

    const el = getAnimationElement(element);
    const wrapper = el.querySelectorAll('[data-animation-marquee="wrapper"]');
    const items = el.querySelectorAll('[data-animation-marquee="item"]');
    const itemsHalf = items ? Math.ceil(items.length / 2) : 0;

    if (items.length <= 1 || !el || !wrapper) return;

    const { outerWidth } = getElementDimension(items[0]);

    let duration = ((outerWidth / 2) * 2 * itemsHalf) / 35;
    if (config?.speed && config.speed > 1) duration = duration / config.speed;

    const tl = gsap.timeline({
        repeat: -1,
        scrollTrigger: {
            trigger: el,
            toggleActions: 'play pause play pause',
            // markers: true,
        },
    });

    const direction = config?.direction ?? 'left';
    let xFrom = 0;
    let xTo = 0;

    if (direction === 'left') xTo = outerWidth * itemsHalf * -1;
    if (direction === 'right') xFrom = outerWidth * itemsHalf * -1;
    if (xFrom !== 0) tl.set(el, { x: outerWidth * itemsHalf * -1 });

    el.addEventListener('mouseenter', () => {
        tl.pause();
    });
    el.addEventListener('mouseleave', () => {
        tl.resume();
    });

    tl.to(wrapper, {
        duration,
        x: xTo,
        ease: 'none',
    });

    return tl;
};
