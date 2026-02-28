export const getEnv = () => {
    return {
        isProduction: process.env.NODE_ENV === 'production',
    };
};
