import { createArrayFromNumber } from '../factory/createArrayFromNumber';
import { createPicsumImage } from '../factory/createPicsumImage';

import parse from 'html-react-parser';

import { HighlightProps, MediaProps } from '@/components/common/Cards';

export const CARDS_HIGHLIGHT: HighlightProps['items'] = createArrayFromNumber(2).map((_, i) => {
    let description = `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem cumque error eum eveniet labore laudantium maiores nesciunt quas ratione.</p>`;
    if (i % 2 === 0) {
        description += `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem cumque error eum eveniet labore laudantium maiores nesciunt quas ratione.</p>`;
    }

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

export const CARDS_MEDIA: MediaProps['items'] = createArrayFromNumber(8).map((_, i) => ({
    link: { href: '/collection/formal' },
    media: [createPicsumImage({ id: 151 + i, width: 800, height: 800 })],
}));
