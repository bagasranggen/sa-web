import React from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Circle, { CircleProps } from '@/components/common/Icon/Circle';

export type ChevronProps = {
    color?: 'dark' | 'light';
    direction?: 'up' | 'down';
    withCircle?: Pick<CircleProps<any>, 'color' | 'size'>;
};

const Chevron = ({ color = 'dark', direction = 'down', withCircle }: ChevronProps): React.ReactElement => {
    let iconClass: ArrayStringProps = ['icon icon--chevron'];
    if ((!withCircle && color === 'dark') || withCircle?.color === 'light') iconClass.push('icon--dark');
    if (!withCircle && color === 'light') iconClass.push('icon--light');
    if (direction && direction === 'up') iconClass.push('icon--up');
    if (direction && direction === 'down') iconClass.push('icon--down');
    iconClass = joinArrayString(iconClass);

    return (
        <Circle
            as={withCircle ? 'div' : undefined}
            className={withCircle ? 'icon--circle-chevron' : undefined}
            {...withCircle}>
            <svg
                className={iconClass}
                width="19"
                height="11"
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.3081 0.399477C14.2977 3.41852 12.319 5.3809 9.3081 9.39948M9.3081 9.39948C6.21286 5.40061 4.2186 3.4574 0.308105 0.399475M9.3081 9.39948V8.84458"
                    // stroke="#F7F5F2"
                />
            </svg>
        </Circle>
    );
};

export default Chevron;
