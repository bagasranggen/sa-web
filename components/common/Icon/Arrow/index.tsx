import React from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Circle, { CircleProps } from '@/components/common/Icon/Circle';

export type ArrowProps = {
    color?: 'dark' | 'light';
    direction?: 'left' | 'right';
    withCircle?: Pick<CircleProps<any>, 'color' | 'size'>;
};

const Arrow = ({ color = 'dark', direction = 'right', withCircle }: ArrowProps): React.ReactElement => {
    let iconClass: ArrayStringProps = ['icon icon--arrow'];
    if ((!withCircle && color === 'dark') || withCircle?.color === 'light') iconClass.push('icon--dark');
    if (!withCircle && color === 'light') iconClass.push('icon--light');
    if (direction && direction === 'left') iconClass.push('icon--left');
    if (direction && direction === 'right') iconClass.push('icon--right');
    iconClass = joinArrayString(iconClass);

    return (
        <Circle
            as={withCircle ? 'div' : undefined}
            className={withCircle ? 'icon--circle-arrow' : undefined}
            {...withCircle}>
            <svg
                className={iconClass}
                width="30"
                height="12"
                viewBox="0 0 30 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M23.0335 10.8095C24.7949 8.46978 25.9398 7.31536 28.2842 5.55879M28.2842 5.55879C25.9513 3.753 24.8176 2.58953 23.0335 0.308114M28.2842 5.55879L-4.69311e-05 5.55879" />
            </svg>
        </Circle>
    );
};

export default Arrow;
