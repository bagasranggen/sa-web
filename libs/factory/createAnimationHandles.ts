import { BaseAnimationProps } from '@/libs/@types';

type CreateAnimationHandlesProps = {
    handles: string;
    animation: ({ element, config, id }: Omit<BaseAnimationProps, 'config'> & { config?: any }) => void;
    extendTimeline?: boolean;
};

export const createAnimationHandles = ({ handles, animation, extendTimeline }: CreateAnimationHandlesProps) => {
    return {
        [handles]: {
            animation,
            extendTimeline: !!extendTimeline,
        },
    };
};
