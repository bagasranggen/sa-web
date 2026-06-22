export const sortLexicoArrayObject = ({ items, key }: { items: any[]; key: string }) => {
    return items.sort((a, b) => a[key].localeCompare(b[key]));
};
