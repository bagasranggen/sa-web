import React, { forwardRef, HTMLInputTypeAttribute, RefObject } from 'react';

import {
    BaseHookOptionProps,
    BaseInputHookProps as BaseInputCommonHookProps,
    BaseRegularInputProps,
    InputRegularRef,
    InputSelectRef,
    InputTextareaRef,
} from '@/libs/@types';

import InputText from '@/components/common/Input/shared/InputText';
import InputRadio from '@/components/common/Input/shared/InputRadio';
import InputCheckbox from '@/components/common/Input/shared/InputCheckbox';
import InputSelect, { BaseInputSelectProps, InputSelectItemProps } from '@/components/common/Input/shared/InputSelect';
import InputTextarea, { BaseInputTextareaProps } from '@/components/common/Input/shared/InputTextarea';

export type BaseInputRef = InputRegularRef | InputSelectRef | InputTextareaRef;

export type BaseInputHookProps = {
    hook?: BaseInputCommonHookProps & BaseHookOptionProps;
};

export type BaseInputProps = BaseInputHookProps & {
    type: HTMLInputTypeAttribute | 'select' | 'textarea';
} & (BaseRegularInputProps & BaseInputSelectProps & BaseInputTextareaProps);

export type BaseProps = {
    error?: React.ReactNode;
} & BaseInputProps;

const Base = forwardRef<BaseInputRef, BaseProps>(({ error, ...props }, ref) => {
    let input = (
        <InputText
            ref={ref as RefObject<InputRegularRef>}
            {...props}
        />
    );

    if (props.type === 'radio') {
        input = (
            <InputRadio
                ref={ref as RefObject<InputRegularRef>}
                {...props}
            />
        );
    }

    if (props.type === 'checkbox') {
        input = (
            <InputCheckbox
                ref={ref as RefObject<InputRegularRef>}
                {...props}
            />
        );
    }

    if (props?.type === 'select') {
        const { type, ...restProps } = props;

        input = (
            <InputSelect
                ref={ref as RefObject<InputSelectRef>}
                {...restProps}
            />
        );
    }

    if (props?.type === 'textarea') {
        const { type, ...restProps } = props;

        input = (
            <InputTextarea
                ref={ref as RefObject<InputTextareaRef>}
                {...restProps}
            />
        );
    }

    return (
        <>
            {input}
            {error && <small className="block text-rose-500 font-semibold">{error}</small>}
        </>
    );
});

Base.displayName = 'Base';
export default Base;

export type { BaseInputSelectProps, InputSelectItemProps };
