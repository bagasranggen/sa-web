import { ANIMATION_HANDLES } from '@/components/common/Animation/handles';

import { gsap } from 'gsap';

export const registerAnimation = () => {
    Object.entries(ANIMATION_HANDLES).forEach(([name, handle]) => {
        gsap.registerEffect({
            name,
            effect: (targets: HTMLElement[], config: any, id: number) => {
                return handle.animation({ element: targets, config, id });
            },
            extendTimeline: handle?.extendTimeline,
        });
    });
};
