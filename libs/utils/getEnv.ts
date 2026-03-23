const NODE_ENV = process.env.NODE_ENV;
const NEXT_PUBLIC_LINK_REPLACE = process.env.NEXT_PUBLIC_LINK_REPLACE;
const NEXT_PUBLIC_ENABLE_ANIMATION = process.env.NEXT_PUBLIC_ENABLE_ANIMATION;
const NEXT_PUBLIC_CONTACT_PERSON = process.env.NEXT_PUBLIC_CONTACT_PERSON;

export const getEnv = () => {
    return {
        isProduction: NODE_ENV === 'production',
        replaceHref: NEXT_PUBLIC_LINK_REPLACE?.split(','),
        enableAnimation: NEXT_PUBLIC_ENABLE_ANIMATION === '1',
        contactPerson: NEXT_PUBLIC_CONTACT_PERSON,
    };
};
