import { ANIMATION_VARIANTS } from '@/components/common/Animation/handles';
import { MarqueeConfigProps } from '@/components/common/Animation/elements/marquee';

export type BaseAnimationConfigProps<Type, Config> = {
    type?: Type;
    config?: Config;
};

export type BaseAnimationProps = {
    element: HTMLElement[] | Element[] | any;
    config?: gsap.TweenVars;
    id?: number | string;
};

export type AnimationProps =
    | ({
          type?: Exclude<
              (typeof ANIMATION_VARIANTS)[keyof typeof ANIMATION_VARIANTS],
              typeof ANIMATION_VARIANTS.MARQUEE
          >;
      } & Pick<BaseAnimationProps, 'config'>)
    | BaseAnimationConfigProps<typeof ANIMATION_VARIANTS.MARQUEE, MarqueeConfigProps>;
