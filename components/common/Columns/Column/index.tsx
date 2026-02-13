import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, BreakpointsProps, CreateArrayWithLengthX, NumericRange } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';
import { createBreakpointClass } from '@/libs/factory';

export type ColumnOffsetProps =
    | NumericRange<CreateArrayWithLengthX<1>, 12>
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1;

export type ColumnItemProps = NumericRange<CreateArrayWithLengthX<1>, 12> | 'auto';

export type ColumnProps = {
    offset?: Partial<Record<BreakpointsProps, ColumnOffsetProps>> | ColumnOffsetProps;
} & (Partial<Record<BreakpointsProps, ColumnItemProps>> & React.HTMLAttributes<HTMLElement> & PropsWithChildren);

const Column = ({
    className,
    children,
    offset,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    ...props
}: ColumnProps): React.ReactElement => {
    const sizesArr = Object.entries({ xs, sm, md, lg, xl, xxl }).filter(([key, value]) => !!value);
    const utilityColumnClassName = 'column';
    const utilityColumnOffsetClassName = 'column-offset';

    let columnClass: ArrayStringProps = [];

    if (sizesArr.length === 0) columnClass.push(utilityColumnClassName);
    if (sizesArr.length > 0) {
        sizesArr.forEach(([key, value]) => {
            if (value && typeof columnClass !== 'string') {
                columnClass.push(
                    createBreakpointClass({
                        breakpoint: key as BreakpointsProps,
                        className: utilityColumnClassName,
                        value,
                    })
                );
            }
        });
    }

    if (offset) {
        if (typeof offset === 'number') {
            const isPositive = offset >= 0;

            columnClass.push(
                createBreakpointClass({
                    className: isPositive ? utilityColumnOffsetClassName : `-${utilityColumnOffsetClassName}`,
                    value: offset,
                })
            );
        }

        if (typeof offset === 'object') {
            const offsetArr = Object.entries(offset);

            if (offsetArr && offsetArr.length > 0) {
                offsetArr.forEach(([key, value]) => {
                    if (value && typeof columnClass !== 'string') {
                        const isPositive = value >= 0;

                        columnClass.push(
                            createBreakpointClass({
                                breakpoint: key as BreakpointsProps,
                                className: isPositive
                                    ? utilityColumnOffsetClassName
                                    : `-${utilityColumnOffsetClassName}`,
                                value,
                            })
                        );
                    }
                });
            }
        }
    }

    if (className) columnClass.push(className);
    columnClass = joinArrayString(columnClass);

    return (
        <div
            {...(columnClass ? { className: columnClass } : {})}
            {...props}>
            {children}
        </div>
    );
};

export default Column;
