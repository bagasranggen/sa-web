import React, { forwardRef } from 'react';

import { ArrayStringProps, BaseRegularInputProps, InputRegularRef } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';
import { createInputHooks } from '@/libs/factory';

import { BaseInputHookProps } from '@/components/common/Input';
import Icon from '@/components/common/Icon';

export type InputCheckboxProps = BaseRegularInputProps & BaseInputHookProps;

const InputCheckbox = forwardRef<InputRegularRef, InputCheckboxProps>(
    ({ id, className, children, hook, checked, ...props }, ref) => {
        let inputClass: ArrayStringProps = ['group input input--checkbox'];

        if (className) inputClass.push(className);
        inputClass = joinArrayString(inputClass);

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
            <div className={inputClass}>
                <input
                    {...props}
                    {...inputHook}
                    {...inputRef}
                    {...(hook ? { defaultChecked: checked } : { checked: checked })}
                    id={id}
                    type="checkbox"
                    className="peer"
                    hidden
                />
                <label htmlFor={id}>
                    {children}
                    <Icon.Check className="absolute top-1/2 -translate-y-1/2 left-0.25" />
                </label>
            </div>
        );
    }
);

InputCheckbox.displayName = 'InputRadio';
export default InputCheckbox;
