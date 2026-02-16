import { Component } from '@/libs/@types';

import Check, { CheckProps } from '@/components/common/Icon/Check';

export type * from '@/components/common/Icon/Check';

type IconComposition = {
    Check: Component<CheckProps>;
};

export default Object.assign<{}, IconComposition>({}, { Check });
