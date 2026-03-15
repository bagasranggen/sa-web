// import { BareMediaProps, MediaGlobal } from '@/libs/@types';

import { Media } from '@/libs/@types';
import { BaseItemProps } from '@/components/common/Picture';

export type CheckMediaStatusItemProps = Pick<BaseItemProps, 'src' | 'width' | 'height' | 'alt'>;

export type CheckMediaStatusProps = {
    // item: Omit<MediaGlobal, 'url'> & Pick<BareMediaProps, 'src'>;
    item: {
        sizes?: Record<string, Pick<Media, 'url' | 'filename' | 'height' | 'width'>>;
    } & Pick<Media, 'url' | 'alt' | 'filename' | 'height' | 'width'>;
    handles?: string[];
    volumeAssets: string;
};

export const checkMediaStatus = ({ item, handles, volumeAssets }: CheckMediaStatusProps) => {
    let data: (Partial<CheckMediaStatusItemProps> & Partial<Record<string, CheckMediaStatusItemProps>>) | null = null;

    if (item?.filename) {
        data = Object.assign(data ?? {}, {
            src: `/api/media/${item.filename}?volumeAsset=${volumeAssets}`,
            width: item?.width ?? 0,
            height: item?.height ?? 0,
            alt: item?.alt ?? item?.filename ?? '',
        } as any);
    }

    if (handles && handles.length > 0) {
        handles.forEach((handle) => {
            const media = item?.sizes?.[handle];

            if (media?.url) {
                data = Object.assign(data ?? {}, {
                    [handle]: {
                        src: `/api/media/${media?.filename}?volumeAsset=${volumeAssets}`,
                        width: media?.width ?? 0,
                        height: media?.height ?? 0,
                        alt: item?.alt ?? media?.filename ?? '',
                    },
                });
            }
        });
    }

    return { data };
};
