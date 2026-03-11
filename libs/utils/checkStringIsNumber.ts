export const checkStringIsNumber = (str: string) => {
    return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
};
