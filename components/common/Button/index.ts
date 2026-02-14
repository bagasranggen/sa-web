import { Component, RefComponent } from '@/libs/@types';

import Base, { BaseProps, BaseRefProps } from '@/components/common/Button/Base';
import Container, { ContainerProps } from '@/components/common/Button/Container';

export type * from '@/components/common/Button/Base';
export type * from '@/components/common/Button/Container';

type ButtonComposition = {};
    Container: Component<ContainerProps>;

export default Object.assign<RefComponent<BaseProps, BaseRefProps>, ButtonComposition>(Base, { Container });
