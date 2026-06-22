import React, { PropsWithChildren } from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type LabelTextProps = {
    active?: boolean;
    standalone?: boolean;
    required?: boolean;
} & (Partial<Pick<HTMLLabelElement, 'className' | 'htmlFor'>> & PropsWithChildren);

const LabelText = ({
    children,
    htmlFor,
    className,
    active,
    standalone,
    required,
}: LabelTextProps): React.ReactElement => {
    let labelClass: ArrayStringProps = ['input__label'];
    if (standalone) labelClass.push('input__label--standalone');
    if (active) labelClass.push('input__label--active');
    if (className) labelClass.push(className);
    labelClass = joinArrayString(labelClass);

    return (
        <label
            htmlFor={htmlFor}
            className={labelClass}>
            {children}
            {required && <sup>*</sup>}
        </label>
    );
};

export default LabelText;
