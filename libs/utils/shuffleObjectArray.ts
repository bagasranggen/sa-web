export type ShuffleObjectArrayProps<T> = {
    items: T[];
    limit?: number;
};

export const shuffleObjectArray = <T>({ items, limit }: ShuffleObjectArrayProps<T>) => {
    const data = [...items].sort(() => Math.random() - 0.5);

    if (limit && data.length > limit) data.length = limit;

    return data;
};
