import { ProductListingFilterProps } from '@/components/pages/ProductListingIndex/ProductListingFilter';

export const PRODUCTS_SORT: ProductListingFilterProps['sort'] = [
    { value: 'a-z', label: 'a-z' },
    { value: 'z-a', label: 'z-a' },
];

export const PRODUCTS_FILTERS: ProductListingFilterProps['filters'] = [
    {
        handle: 'color',
        children: 'Color',
        checkbox: [
            { label: 'Red', value: '#555' },
            { label: 'Blue', value: '#666' },
            { label: 'Cyan', value: '#777' },
            { label: 'Magenta', value: '#999' },
        ],
    },
    {
        handle: 'size',
        children: 'Size',
        checkbox: [
            { label: 'Extra Small', value: 'xs' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
        ],
    },
];
