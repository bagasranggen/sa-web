import { Component, RefComponent } from '@/libs/@types';

import Base, { BaseProps, BaseRefProps } from '@/components/common/Button/Base';

export type * from '@/components/common/Button/Base';

type ButtonComposition = {};

export default Object.assign<RefComponent<BaseProps, BaseRefProps>, ButtonComposition>(Base, {});
