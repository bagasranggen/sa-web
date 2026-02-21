import { createAnimationHandles } from '@/libs/factory';

import { fade, fadeIn } from '@/components/common/Animation/elements/fade';
import { marquee } from '@/components/common/Animation/elements/marquee';

export const ANIMATION_VARIANTS = {
    FADE: 'fade',
    FADE_IN: 'fade-in',
    MARQUEE: 'marquee',
} as const;

export const ANIMATION_HANDLES = {
    ...createAnimationHandles({
        handles: ANIMATION_VARIANTS.FADE,
        animation: fade,
        extendTimeline: true,
    }),
    ...createAnimationHandles({
        handles: ANIMATION_VARIANTS.FADE_IN,
        animation: fadeIn,
    }),
    ...createAnimationHandles({
        handles: ANIMATION_VARIANTS.MARQUEE,
        animation: marquee,
    }),
};
