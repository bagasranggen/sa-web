import { Component } from '@/libs/@types';

import Highlight, { HighlightProps } from '@/components/common/Cards/Highlight';

export type * from '@/components/common/Cards/Highlight';

type CardsComposition = {
    Highlight: Component<HighlightProps>;
};

export default Object.assign<{}, CardsComposition>({}, { Highlight });
