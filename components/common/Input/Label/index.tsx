'use client';

import React, { forwardRef, useState } from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Base, { BaseInputRef, BaseProps } from '@/components/common/Input/Base';
import LabelText from '@/components/common/Input/Label/LabelText';

export type LabelProps = {
    label: string;
} & (Omit<BaseProps, 'id'> & Required<Pick<BaseProps, 'id'>>);

const Label = forwardRef<BaseInputRef, LabelProps>(
    ({ id, label, className, type, error, hidden, onFocus, onBlurCapture, ...props }, ref) => {
        const [isFocus, setIsFocus] = useState<boolean>(false);

        let inputGroupClass: ArrayStringProps = ['group input input--label'];
        inputGroupClass.push(`input--${type}`);
        if (hidden) inputGroupClass.push('input--hidden');
        if (!isFocus && type !== 'textarea') inputGroupClass.push('input--blur');
        inputGroupClass = joinArrayString(inputGroupClass);

        let inputClass: ArrayStringProps = ['peer'];
        if (className) inputClass.push(className);
        inputClass = joinArrayString(inputClass);

        let inputProps = props;
        if (type !== 'day-picker') inputProps = Object.assign(inputProps, { placeholder: label });
        if (type === 'day-picker') inputProps = Object.assign(inputProps, { icon: { size: 30 } });

        return (
            <>
                <div className={inputGroupClass}>
                    <Base
                        ref={ref}
                        type={type}
                        id={id}
                        className={inputClass}
                        hidden={hidden}
                        onFocus={(e: any) => {
                            setIsFocus(true);
                            if (onFocus) onFocus(e);
                        }}
                        onBlurCapture={(e: any) => {
                            setIsFocus(false);
                            if (onBlurCapture) onBlurCapture(e);
                        }}
                        {...inputProps}
                    />

                    <LabelText
                        htmlFor={id}
                        required={props?.required || (props?.hook?.required as boolean)}>
                        {label}
                    </LabelText>
                </div>

                {error && !hidden && <small className="input__error">{error}</small>}
            </>
        );
    }
);

Label.displayName = 'Label';
export default Label;

export { LabelText };
