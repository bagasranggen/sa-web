import { Component } from '@/libs/@types';

import Arrow, { ArrowProps } from '@/components/common/Icon/Arrow';
import Check, { CheckProps } from '@/components/common/Icon/Check';
import Chevron, { ChevronProps } from '@/components/common/Icon/Chevron';

export type * from '@/components/common/Icon/Arrow';
export type * from '@/components/common/Icon/Check';
export type * from '@/components/common/Icon/Chevron';

type IconComposition = {
    Arrow: Component<ArrowProps>;
    Check: Component<CheckProps>;
    Chevron: Component<ChevronProps>;
};

export default Object.assign<{}, IconComposition>({}, { Arrow, Check, Chevron });
