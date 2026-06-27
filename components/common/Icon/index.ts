import { Component } from '@/libs/@types';

import Arrow, { ArrowProps } from '@/components/common/Icon/Arrow';
import Check, { CheckProps } from '@/components/common/Icon/Check';
import Chevron, { ChevronProps } from '@/components/common/Icon/Chevron';
import Hamburger, { HamburgerProps } from '@/components/common/Icon/Hamburger';
import Sekar, { SekarProps } from '@/components/common/Icon/Sekar';

export type * from '@/components/common/Icon/Arrow';
export type * from '@/components/common/Icon/Check';
export type * from '@/components/common/Icon/Chevron';
export type * from '@/components/common/Icon/Hamburger';
export type * from '@/components/common/Icon/Sekar';

type IconComposition = {
    Arrow: Component<ArrowProps>;
    Check: Component<CheckProps>;
    Chevron: Component<ChevronProps>;
    Hamburger: Component<HamburgerProps>;
    Sekar: Component<SekarProps>;
};

export default Object.assign<{}, IconComposition>({}, { Arrow, Check, Chevron, Hamburger, Sekar });
