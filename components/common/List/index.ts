import { Component } from '@/libs/@types';

import Base, { BaseProps } from '@/components/common/List/Base';
import Inline, { InlineProps } from '@/components/common/List/Inline';

export type * from '@/components/common/List/Base';

type ListComposition = {
    Inline: Component<InlineProps>;
};

export default Object.assign<Component<BaseProps>, ListComposition>(Base, { Inline });
