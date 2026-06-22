import { ANIMATION_VARIANTS } from '@/components/common/Animation/handles';
import { FadeConfigProps } from '@/components/common/Animation/elements/fade';
import { MarqueeConfigProps } from '@/components/common/Animation/elements/marquee';

export type BaseAnimationCustomConfigProps<Type, Config> = {
    type?: Type;
    config?: Config;
};

export type BaseAnimationConfigProps = gsap.TweenVars;

export type BaseAnimationProps = {
    element: HTMLElement[] | Element[] | any;
    config?: BaseAnimationConfigProps;
    id?: HTMLElement['id'];
};

export type AnimationProps =
    | ({
          type?: Exclude<
              (typeof ANIMATION_VARIANTS)[keyof typeof ANIMATION_VARIANTS],
              typeof ANIMATION_VARIANTS.FADE | typeof ANIMATION_VARIANTS.FADE_IN | typeof ANIMATION_VARIANTS.MARQUEE
          >;
      } & Pick<BaseAnimationProps, 'config'>)
    | BaseAnimationCustomConfigProps<typeof ANIMATION_VARIANTS.FADE, FadeConfigProps>
    | BaseAnimationCustomConfigProps<typeof ANIMATION_VARIANTS.FADE_IN, FadeConfigProps>
    | BaseAnimationCustomConfigProps<typeof ANIMATION_VARIANTS.MARQUEE, MarqueeConfigProps>;
