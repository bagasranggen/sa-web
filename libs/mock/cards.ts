import { CATEGORY_TITLE_OBJ } from './category';

import { createArrayFromNumber } from '../factory/createArrayFromNumber';
import { createPicsumImage } from '../factory/createPicsumImage';

import parse from 'html-react-parser';

import { HighlightProps, MediaProps } from '@/components/common/Cards';
import { TEXT_SHORT } from '@/libs/mock/text';

export const CARDS_HIGHLIGHT: HighlightProps['items'] = createArrayFromNumber(2).map((_, i) => {
    let description = TEXT_SHORT;
    if (i % 2 === 0) description += TEXT_SHORT;

    return {
        link: {
            href: '/collection/formal/gema-a',
            children: 'Detail',
        },
        label: 'New Release',
        media: [
            createPicsumImage({ id: 239 + i, width: 600, height: 800, media: 768 }),
            createPicsumImage({ id: 239 + i, width: 600, height: 450 }),
        ],
        description: parse(description),
        children: 'Gema black - B0' + (26 + i),
    };
});

export const CARDS_MEDIA: MediaProps['items'] = Object.entries(CATEGORY_TITLE_OBJ).map(([key, value], i) => {
    return {
        link: { href: `/collection/${key}`, children: value },
        media: [createPicsumImage({ id: 151 + i, width: 800, height: 800 })],
    };
});
