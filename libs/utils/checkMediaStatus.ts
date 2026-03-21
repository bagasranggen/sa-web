import { VOLUME_ASSET_HANDLES } from '@/libs/constants';
import { Media } from '@/libs/@types';

import { BaseItemProps } from '@/components/common/Picture';

export type CheckMediaStatusItemProps = Pick<BaseItemProps, 'src' | 'width' | 'height' | 'alt'>;

export type CheckMediaStatusProps = {
    item: {
        sizes?: Record<string, Pick<Media, 'url' | 'filename' | 'height' | 'width'>>;
    } & Pick<Media, 'url' | 'alt' | 'filename' | 'height' | 'width'>;
    handles?: string[];
    volumeAssets: (typeof VOLUME_ASSET_HANDLES)[keyof typeof VOLUME_ASSET_HANDLES];
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
