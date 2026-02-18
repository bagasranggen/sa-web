import { createAnimationHandles } from '@/libs/factory';

import { marquee } from '@/components/common/Animation/elements/marquee';

export const ANIMATION_VARIANTS = {
    MARQUEE: 'marquee',
} as const;

export const ANIMATION_HANDLES = {
    ...createAnimationHandles({
        handles: ANIMATION_VARIANTS.MARQUEE,
        animation: marquee,
    }),
};
