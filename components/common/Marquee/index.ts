import { Component } from '@/libs/@types';

import Base, { BaseProps } from '@/components/common/Marquee/Base';

export type * from '@/components/common/Marquee/Base';

export type MarqueeComposition = {};

export default Object.assign<Component<BaseProps>, MarqueeComposition>(Base, {});
