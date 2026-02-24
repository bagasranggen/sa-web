import React from 'react';
import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type HamburgerProps = {
    active?: boolean;
};

const Hamburger = ({ active }: HamburgerProps): React.ReactElement => {
    let iconClass: ArrayStringProps = ['icon icon--hamburger'];
    if (active) iconClass.push('icon--active');
    iconClass = joinArrayString(iconClass);

    return <div className={iconClass} />;
};

export default Hamburger;
