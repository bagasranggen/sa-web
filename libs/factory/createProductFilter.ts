import { ListingFilterProps } from '@/components/features/Listing/ListingFilter';

export type ProductFilterItemProps = NonNullable<ListingFilterProps['filters']>[number];

export type CreateProductFilterProps = {
    map: Map<string, string>;
} & Pick<ProductFilterItemProps, 'children' | 'handle'>;

export const createProductFilter = ({ map, handle, children }: CreateProductFilterProps) => {
    let data: ProductFilterItemProps | undefined = undefined;

    if (map && map.size > 0 && handle && children) {
        const filters: ProductFilterItemProps['checkbox'] = [];

        Array.from(map).forEach(([value, label]) => {
            filters.push({ label, value });
        });

        if (filters.length > 0) {
            data = Object.assign(data ?? {}, {
                handle,
                children,
                checkbox: filters,
            });
        }
    }

    return data;
};
