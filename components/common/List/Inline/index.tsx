import React from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Base, { BaseProps } from '@/components/common/List';

export type InlineProps = BaseProps;

const Inline = ({ className, items, ...props }: InlineProps): React.ReactElement => {
    let listCLass: ArrayStringProps = ['list--inline'];
    if (className) listCLass.push(className);
    listCLass = joinArrayString(listCLass);

    return (
        <Base
            {...props}
            className={listCLass}
            items={items?.map((item) => {
                return {
                    ...item,
                };
            })}
        />
    );
};

export default Inline;
