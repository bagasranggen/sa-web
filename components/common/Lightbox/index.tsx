import React, { useMemo } from 'react';

import { useWindowSize } from 'react-use';
import { default as YarlLightbox, LightboxProps, SlideImage } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { BaseProps } from '@/components/common/Picture';

export type LightboxItemProps = BaseProps['items'];

export type LightBoxProps = {
    items?: LightboxItemProps[];
    carousel?: Partial<LightboxProps['carousel']>;
} & (Pick<LightboxProps, 'index' | 'close'> & Partial<Pick<LightboxProps, 'on' | 'render' | 'className'>>);

const LightBox = ({
    items,
    index,
    close,
    on,
    carousel,
    render,
    className,
}: LightBoxProps): React.ReactElement | null => {
    const { width } = useWindowSize();

    const slides: SlideImage[] = useMemo(() => {
        const data: SlideImage[] = [];

        if (items && items.length > 0) {
            items.forEach((item) => {
                if (item && Array.isArray(item)) {
                    item.forEach((itm, idx, arr) => {
                        const prevItm = arr?.[idx - 1];

                        let min = undefined;
                        let max = undefined;

                        if (itm?.media) min = itm.media;
                        if (prevItm && prevItm?.media) max = prevItm.media;

                        if (min && max && width >= min && width < max) data.push(itm as SlideImage);
                        if (min && !max && width >= min) data.push(itm as SlideImage);
                        if (!min && max && width < max) data.push(itm as SlideImage);
                    });
                }
            });
        }

        return data;
    }, [items, width]);

    if (!items || items.length === 0) return null;

    return (
        <YarlLightbox
            className={className}
            carousel={carousel}
            render={render}
            open={index >= 0}
            index={index}
            close={close}
            on={on}
            slides={slides}
        />
    );
};

export default LightBox;
