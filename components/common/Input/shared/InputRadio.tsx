import React, { forwardRef } from 'react';

import { ArrayStringProps, BaseRegularInputProps, InputRegularRef  } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';
import { createInputHooks } from '@/libs/factory';

import { BaseInputHookProps } from '@/components/common/Input';

export type InputRadioProps = BaseRegularInputProps & BaseInputHookProps;

const InputRadio = forwardRef<InputRegularRef, InputRadioProps>(
    ({ id, className, children, hook, checked, ...props }, ref) => {
        let inputClass: ArrayStringProps = ['flex items-center gap-x-0.5 relative cursor-pointer'];
        inputClass.push(
            'before:content-[""] before:inline-block before:shrink-0 before:w-[1.4rem] before:h-[1.4rem] before:border before:border-black before:rounded-full'
        );
        inputClass.push(
            'after:opacity-0 after:inline-block after:w-[.8rem] after:h-[.8rem] after:border after:border-black after:rounded-full after:bg-black after:absolute after:left-[.3rem] after:top-1/2 after:-translate-y-1/2'
        );
        inputClass.push('after:transition-opacity after:duration-200');
        inputClass.push('peer-checked:after:opacity-100');
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
            <div>
                <input
                    {...props}
                    {...inputHook}
                    {...inputRef}
                    {...(hook ? { defaultChecked: checked } : { checked: checked })}
                    id={id}
                    type="radio"
                    className="peer"
                    hidden
                />
                <label
                    htmlFor={id}
                    className={inputClass}>
                    {children}
                </label>
            </div>
        );
    }
);

InputRadio.displayName = 'InputRadio';
export default InputRadio;
