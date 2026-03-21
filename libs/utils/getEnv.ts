export const getEnv = () => {
    return {
        isProduction: process.env.NODE_ENV === 'production',
        replaceHref: process.env.NEXT_PUBLIC_LINK_REPLACE?.split(','),
        enableAnimation: process.env.NEXT_PUBLIC_ENABLE_ANIMATION === '1',
    };
};
