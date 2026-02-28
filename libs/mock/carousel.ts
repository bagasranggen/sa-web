import { createArrayFromNumber } from '../factory/createArrayFromNumber';
import { createPicsumImage } from '../factory/createPicsumImage';

export const CAROUSEL_THUMB_COUNT = 5;

export const CAROUSEL_MEDIA_THUMB = createArrayFromNumber(CAROUSEL_THUMB_COUNT).map((_, i) => [
    createPicsumImage({ id: 151 + i, width: 400, height: 560, media: 768 }),
    createPicsumImage({ id: 151 + i, width: 300, height: 300 }),
]);

export const CAROUSEL_MEDIA_PREVIEW = createArrayFromNumber(CAROUSEL_THUMB_COUNT).map((_, i) => [
    createPicsumImage({ id: 151 + i, width: 1000, height: 1400, media: 768 }),
    createPicsumImage({ id: 151 + i, width: 600, height: 450 }),
]);

export const CAROUSEL_MEDIA_LIGHTBOX = createArrayFromNumber(CAROUSEL_THUMB_COUNT).map((_, i) => [
    // createPicsumImage({ id: 151 + i, width: 1800, height: 2520, media: 992 }),
    createPicsumImage({ id: 151 + i, width: 1000, height: 1400, media: 768 }),
    createPicsumImage({ id: 151 + i, width: 600, height: 840 }),
]);

export const SIZE_GUIDES_LIGHTBOX = [
    [createPicsumImage({ width: 1000, height: 1400, media: 768 }), createPicsumImage({ width: 600, height: 840 })],
    // [
    //     createPicsumImage({ id: 44, width: 1000, height: 1400, media: 768 }),
    //     createPicsumImage({ id: 44, width: 600, height: 840 }),
    // ],
];
