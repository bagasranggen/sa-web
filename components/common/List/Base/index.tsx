import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, ElementTagsProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type BaseItemProps = PropsWithChildren & ClassnameProps;

export type BaseProps = {
    as?: Extract<ElementTagsProps, 'ul' | 'ol'>;
    items: BaseItemProps[];
} & ClassnameProps;

const Base = ({ as: List = 'ul', className, items }: BaseProps): React.ReactElement => {
    if (!items) return <></>;
    if (items.length === 0) return <></>;

    let listClass: ArrayStringProps = ['list'];
    if (className) listClass.push(className);
    listClass = joinArrayString(listClass);

    return (
        <List className={listClass}>
            {items.map((item: BaseItemProps, i: number) => {
                let itemClass: ArrayStringProps = ['list__item'];
                if (item.className) itemClass.push(item.className);
                itemClass = joinArrayString(itemClass);

                return (
                    <li
                        key={i}
                        {...(itemClass ? { className: itemClass } : {})}>
                        {item.children}
                    </li>
                );
            })}
        </List>
    );
};

export default Base;
