import React from 'react';

import { BaseHookOptionProps, BaseInputHookProps } from '@/libs/@types';

export const createInputHooks = (
    hook?: BaseInputHookProps & BaseHookOptionProps,
    input?:
        | Pick<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onClick'>
        | Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>
        | Pick<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>
) => {
    let hookOptions = {};
    if (hook?.required) {
        let required = 'This field is required';
        if (typeof hook.required === 'string') required = hook.required;

        hookOptions = { ...hookOptions, required };
    }
    if (hook?.pattern) hookOptions = { ...hookOptions, pattern: hook.pattern };
    if (input?.onChange) hookOptions = { ...hookOptions, onChange: input.onChange };

    return hook ? hook?.register(hook.name, hookOptions) : undefined;
};
