import React from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Base, { BaseProps } from '@/components/common/Button/Base';

export type BlockProps = {
    active?: boolean;
    color?: 'primary' | 'dark';
} & BaseProps;

const Block = ({ className, active, color, ...props }: BlockProps): React.ReactElement => {
    let btnClass: ArrayStringProps = ['btn--block'];
    if (active) btnClass.push('btn--active');
    if (color === 'dark') btnClass.push('btn--dark');
    if (color === 'primary') btnClass.push('btn--primary');
    if (className) btnClass.push(className);
    btnClass = joinArrayString(btnClass);

    return (
        <Base
            className={btnClass}
            {...props}
        />
    );
};

export default Block;
