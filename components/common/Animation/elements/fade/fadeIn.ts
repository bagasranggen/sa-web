import { gsap } from 'gsap';

import { FadeProps } from '@/components/common/Animation/elements/fade/fade';

export const fadeIn = ({ element, config, id }: FadeProps) => {
    const fadeTl = gsap.timeline({
        scrollTrigger: {
            ...(id ? { id: `fade-in-${id}` } : {}),
            trigger: element,
            // start: () => `top-=${getFadeOffset({ element }) + getSpacingValue({ element }).top} 80%`,
            toggleActions: 'play pause play pause',
            // once: true,
            // markers: true,
        },
    });

    console.log({ config });

    let fadeConfig: FadeProps['config'] = config ?? {};
    if (!config?.direction) fadeConfig = Object.assign(fadeConfig, { direction: 'up' });
    // if(config?.direction) fadeConfig = Object.assign(fadeConfig, { direction: 'up' });

    // const fadeConfig: BaseAnimationProps['config'] = {
    //     ...config,
    //     y: 60,
    // };

    fadeTl.fade(element, fadeConfig);
};
