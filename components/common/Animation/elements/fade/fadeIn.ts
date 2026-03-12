import { gsap } from 'gsap';

import { FadeProps } from '@/components/common/Animation/elements/fade/fade';

export const fadeIn = ({ element, config, id }: FadeProps) => {
    const fadeTl = gsap.timeline({
        id: id ?? undefined,
        scrollTrigger: {
            trigger: element,
            // start: () => `top-=${getFadeOffset({ element }) + getSpacingValue({ element }).top} 80%`,
            toggleActions: 'play pause play pause',
            // markers: true,
        },
    });

    let fadeConfig: FadeProps['config'] = config ?? {};
    if (!config?.direction) fadeConfig = Object.assign(fadeConfig, { direction: 'up' });

    fadeTl.fade(element, fadeConfig);
};
