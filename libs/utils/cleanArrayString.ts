export const cleanArrayString = (array: string[]): string[] => {
    return array.filter((item: string) => item !== '');
};
