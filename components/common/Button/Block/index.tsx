import React from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Base, { BaseProps } from '@/components/common/Button/Base';

export type BlockProps = {
    active?: boolean;
    color?: 'primary' | 'dark' | 'light';
    size?: 'md' | 'lg';
} & BaseProps;

const Block = ({ className, active, color = 'light', size, ...props }: BlockProps): React.ReactElement => {
    let btnClass: ArrayStringProps = ['btn--block'];
    if (active) btnClass.push('btn--active');
    if (color === 'dark') btnClass.push('btn--dark');
    if (color === 'light') btnClass.push('btn--light');
    if (color === 'primary') btnClass.push('btn--primary');
    if (size === 'md') btnClass.push('btn--md');
    if (size === 'lg') btnClass.push('btn--lg');
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
