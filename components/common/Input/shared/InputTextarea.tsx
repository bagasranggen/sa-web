import React, { forwardRef } from 'react';

import { InputTextareaRef } from '@/libs/@types';

import { BaseInputHookProps } from '@/components/common/Input';
import { createInputHooks } from '@/libs/factory';

export type BaseInputTextareaProps = {} & React.TextareaHTMLAttributes<InputTextareaRef>;

export type InputTextareaProps = BaseInputHookProps & BaseInputTextareaProps;

const InputTextarea = forwardRef<InputTextareaRef, InputTextareaProps>(({ hook, ...props }, ref) => {
    const inputHook = createInputHooks(hook, props);

    let inputRef = { ref: ref };
    if (hook && inputHook) {
        inputRef = {
            ref: (e) => {
                inputHook?.ref(e);

                if (ref && 'current' in ref && e) (ref as any).current = e;
            },
        };
    }

    return (
        <textarea
            {...props}
            {...inputHook}
            {...inputRef}
        />
    );
});

export default InputTextarea;
