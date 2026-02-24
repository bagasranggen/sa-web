import { Component, RefComponent } from '@/libs/@types';

import Base, { BaseProps } from '@/components/common/Heading/Base';

export type * from '@/components/common/Heading/Base';

export type HeadingComposition = {};

export default Object.assign<RefComponent<BaseProps, HTMLHeadingElement>, HeadingComposition>(Base, {});
