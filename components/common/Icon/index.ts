import { Component } from '@/libs/@types';

import Arrow, { ArrowProps } from '@/components/common/Icon/Arrow';
import Check, { CheckProps } from '@/components/common/Icon/Check';

export type * from '@/components/common/Icon/Arrow';
export type * from '@/components/common/Icon/Check';

type IconComposition = {
    Arrow: Component<ArrowProps>;
    Check: Component<CheckProps>;
};

export default Object.assign<{}, IconComposition>({}, { Arrow, Check });
