import React from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import ProductListingFilterItem, {
    FilterFormFields,
    ProductListingFilterItemProps,
} from '@/components/pages/ProductListingIndex/ProductListingFilterItem';
import Button from '@/components/common/Button';

export type ProductListingFilterProps = {
    activeFilter?: FilterFormFields;
    filters?: Pick<ProductListingFilterItemProps, 'handle' | 'checkbox' | 'children'>[];
    reset?: {
        active?: boolean;
        onResetFilters?: () => void;
    };
} & (ClassnameProps & Pick<ProductListingFilterItemProps, 'onOpenChange'>);

const ProductListingFilter = ({
    className,
    filters,
    activeFilter,
    reset,
    onOpenChange,
    // onResetFilters,
}: ProductListingFilterProps): React.ReactElement | null => {
    let filterClass: ArrayStringProps = ['flex justify-between'];
    if (className) filterClass.push(className);
    filterClass = joinArrayString(filterClass);

    if (!filters || filters.length === 0) return null;

    return (
        <form>
            <div className={filterClass}>
                {filters && filters.length > 0 && (
                    <div className="flex flex-wrap gap-x-2">
                        {/* FILTERS */}
                        {filters.map((item, i) => {
                            let filter = undefined;
                            if (item?.checkbox) filter = item.checkbox;

                            const active = item?.handle && activeFilter?.[item.handle];
                            const hasFilter = !!(active && active.length > 0);

                            let children = `${item.children}`;
                            if (hasFilter) {
                                const selected: string[] = [];

                                if (active && active.length > 0) {
                                    active.forEach((itm) => {
                                        if (filter) {
                                            const find = filter.find((f) => f.value === itm);

                                            if (find && find?.label) selected.push(find.label);
                                        }
                                    });
                                }

                                if (selected.length > 0) children += `: ${joinArrayString(selected, ', ')}`;
                            }

                            return (
                                <ProductListingFilterItem
                                    key={i}
                                    group={{ className: 'px-1.5 py-1' }}
                                    handle={item.handle}
                                    button={{ active: hasFilter }}
                                    onOpenChange={onOpenChange}
                                    active={activeFilter}
                                    checkbox={item?.checkbox}>
                                    {children}
                                </ProductListingFilterItem>
                            );
                        })}

                        {/* RESET */}
                        {reset && reset?.active && (
                            <Button.Block
                                as="button"
                                onClick={reset?.onResetFilters}>
                                Reset Filter
                            </Button.Block>
                        )}
                    </div>
                )}

                {/* SORT */}
                <div>
                    <ProductListingFilterItem
                        content={{ align: 'end' }}
                        handle="sort"
                        onOpenChange={onOpenChange}
                        select={[
                            { value: 'a-z', label: 'a-z' },
                            { value: 'z-a', label: 'z-a' },
                        ]}>
                        Sort By: a-z
                    </ProductListingFilterItem>
                </div>
            </div>
        </form>
    );
};

export default ProductListingFilter;
