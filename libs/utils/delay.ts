export const delay = ({ ms = 0 }: { ms: number }) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
