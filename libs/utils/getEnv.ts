import { checkStringIsNumber } from '@/libs/utils/checkStringIsNumber';

const NODE_ENV = process.env.NODE_ENV;
const LINK_REPLACE = process.env.NEXT_PUBLIC_LINK_REPLACE;
const ENABLE_ANIMATION = process.env.NEXT_PUBLIC_ENABLE_ANIMATION;
const CONTACT_PERSON = process.env.NEXT_PUBLIC_CONTACT_PERSON;
const PRERENDER_LIMIT_PAGES = process.env.NEXT_PUBLIC_PRERENDER_LIMIT_PAGES;
const PRERENDER_LIMIT_PRODUCTS = process.env.NEXT_PUBLIC_PRERENDER_LIMIT_PRODUCTS;

export const getEnv = () => {
    let prerenderLimitPages: undefined | number = undefined;
    if (PRERENDER_LIMIT_PAGES && checkStringIsNumber(PRERENDER_LIMIT_PAGES)) {
        prerenderLimitPages = parseInt(PRERENDER_LIMIT_PAGES);
    }

    let prerenderLimitProducts: undefined | number = -1;
    if (PRERENDER_LIMIT_PRODUCTS && checkStringIsNumber(PRERENDER_LIMIT_PRODUCTS)) {
        prerenderLimitProducts = parseInt(PRERENDER_LIMIT_PRODUCTS);
    }

    return {
        isProduction: NODE_ENV === 'production',
        replaceHref: LINK_REPLACE?.split(','),
        enableAnimation: ENABLE_ANIMATION === '1',
        contactPerson: CONTACT_PERSON,
        prerenderLimitPages,
        prerenderLimitProducts,
    };
};
