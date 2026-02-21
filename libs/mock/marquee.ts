import { createArrayFromNumber } from '../factory/createArrayFromNumber';
import { createPicsumImage } from '../factory/createPicsumImage';

export const MARQUEE_HOMEPAGE = createArrayFromNumber(4).map((_, i) => ({
    link: {
        href: '/collection/formal/gema-a-' + i,
    },
    items: [createPicsumImage({ id: 152 + i, width: 800, height: 600 })],
}));
