import { Component, RefComponent } from '@/libs/@types';

import Base, { BaseProps, BaseRefProps } from '@/components/common/Button/Base';
import Block, { BlockProps } from '@/components/common/Button/Block';
import Container, { ContainerProps } from '@/components/common/Button/Container';

export type * from '@/components/common/Button/Base';
export type * from '@/components/common/Button/Block';
export type * from '@/components/common/Button/Container';

type ButtonComposition = {
    Block: Component<BlockProps>;
    Container: Component<ContainerProps>;
};

export default Object.assign<RefComponent<BaseProps, BaseRefProps>, ButtonComposition>(Base, { Block, Container });
