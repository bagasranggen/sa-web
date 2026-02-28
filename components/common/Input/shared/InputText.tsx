import React, { forwardRef } from 'react';

import { BaseRegularInputProps, InputRegularRef } from '@/libs/@types';
import { createInputHooks } from '@/libs/factory';

import { BaseInputHookProps } from '@/components/common/Input';

export type InputTextProps = BaseRegularInputProps & BaseInputHookProps;

const InputText = forwardRef<InputRegularRef, InputTextProps>(({ hook, value, ...props }, ref) => {
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
        <input
            {...props}
            {...inputHook}
            {...inputRef}
            {...(hook ? { defaultValue: value } : { value: value })}
        />
    );
});

InputText.displayName = 'InputText';
export default InputText;
