import { Component } from '@/libs/@types';

import Highlight, { HighlightProps } from '@/components/common/Cards/Highlight';
import Media, { MediaProps } from '@/components/common/Cards/Media';
import Thumbnail, { ThumbnailProps } from '@/components/common/Cards/Thumbnail';

export type * from '@/components/common/Cards/Highlight';
export type * from '@/components/common/Cards/Media';
export type * from '@/components/common/Cards/Thumbnail';

type CardsComposition = {
    Highlight: Component<HighlightProps>;
    Media: Component<MediaProps>;
    Thumbnail: Component<ThumbnailProps>;
};

export default Object.assign<{}, CardsComposition>({}, { Highlight, Media, Thumbnail });
