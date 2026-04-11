import React from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import { useWindowSize } from 'react-use';

import Button from '@/components/common/Button';
import Columns from '@/components/common/Columns';
import Animation from '@/components/common/Animation';
import ListingFilterItem, {
    ListingFilterItemProps,
    FilterFormFields,
} from '@/components/features/Listing/ListingFilterItem';

export type ListingFilterProps = {
    activeFilter?: FilterFormFields;
    filters?: Pick<ListingFilterItemProps, 'handle' | 'checkbox' | 'children'>[];
    sort?: ListingFilterItemProps['select'];
    reset?: {
        active?: boolean;
        onResetFilters?: () => void;
    };
} & (ClassnameProps & Pick<ListingFilterItemProps, 'onOpenChange'>);

const ListingFilter = ({
    className,
    sort,
    filters,
    activeFilter,
    reset,
    onOpenChange,
}: ListingFilterProps): React.ReactElement | null => {
    const { width } = useWindowSize();

    let filterClass: ArrayStringProps = [];
    if (className) filterClass.push(className);
    filterClass = joinArrayString(filterClass);

    const hasSort = sort && sort.length > 0;
    const sortActive = activeFilter?.['sort'] && activeFilter['sort'].length > 0 ? activeFilter['sort'][0] : undefined;

    let sortActiveFilter = undefined;
    if (sortActive && activeFilter && sort) {
        const tmp = sort.find((item) => item?.value === activeFilter?.['sort']?.[0]);

        if (tmp) sortActiveFilter = tmp.value;
    }

    let sortChildren = '';
    if (hasSort) sortChildren = `Sort By: ${sort[0].label}`;
    if (activeFilter?.['sort']) sortChildren = `Sort By: ${sortActiveFilter}`;

    if (!filters || filters.length === 0) return null;

    return (
        <form>
            <Columns
                gutterY={1}
                className={filterClass}>
                {filters && filters.length > 0 && (
                    <Columns.Column className="order-2 md:order-1">
                        <Button.Container className="gap-x-2 gap-y-1 max-md:justify-center">
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
                                    <ListingFilterItem
                                        key={i}
                                        group={{ className: 'px-1.5 py-1' }}
                                        handle={item.handle}
                                        content={{
                                            className: 'max-md:w-[calc(100vw-3rem)]',
                                        }}
                                        button={{ active: hasFilter, className: 'max-md:w-full max-md:text-start' }}
                                        onOpenChange={onOpenChange}
                                        active={activeFilter}
                                        checkbox={item?.checkbox}>
                                        {children}
                                    </ListingFilterItem>
                                );
                            })}

                            {/* RESET */}
                            {reset && reset?.active && (
                                <Animation
                                    type="fade"
                                    config={{ direction: width >= 768 ? 'left' : 'up' }}>
                                    <Button.Block
                                        as="button"
                                        onClick={reset?.onResetFilters}
                                        className="max-md:my-2">
                                        Reset Filter
                                    </Button.Block>
                                </Animation>
                            )}
                        </Button.Container>
                    </Columns.Column>
                )}

                {/* SORT */}
                {hasSort && (
                    <Columns.Column
                        md="auto"
                        className="order-1 md:order-2">
                        <ListingFilterItem
                            content={{
                                align: 'end',
                                className: 'max-md:w-[calc(100vw-3rem)]',
                            }}
                            handle="sort"
                            button={{
                                className: 'max-md:w-full max-md:text-start',
                            }}
                            onOpenChange={onOpenChange}
                            select={sort}>
                            {sortChildren}
                        </ListingFilterItem>
                    </Columns.Column>
                )}
            </Columns>
        </form>
    );
};

export default ListingFilter;
