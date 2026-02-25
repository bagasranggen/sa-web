'use client';

import React, { forwardRef, useMemo, useState } from 'react';

import { ArrayStringProps, BaseRegularInputProps, InputRegularRef } from '@/libs/@types';
import { createInputHooks } from '@/libs/factory';
import { joinArrayString } from '@/libs/utils';

import { CalendarDays, LucideProps } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { BaseInputHookProps } from '@/components/common/Input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/shadcn/DropdownMenu';
import Calendar, { CalendarProps } from '@/components/common/Calendar';

export type BaseInputDayPickerProps = {
    calendar?: Partial<Pick<CalendarProps, 'mode'>>;
    icon?: Pick<LucideProps, 'size'>;
} & Omit<BaseRegularInputProps, 'type' | 'disabled' | 'placeholder' | 'value'>;

export type InputDayPickerProps = BaseInputDayPickerProps & BaseInputHookProps;

const InputDayPicker = forwardRef<InputRegularRef, InputDayPickerProps>(({ hook, calendar, icon, ...props }, ref) => {
    const inputHook = createInputHooks(hook, props);
    const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(undefined);

    const value = useMemo(() => {
        const mode = calendar?.mode;

        let data = undefined;

        if (selectedDate) {
            const from = selectedDate.from?.toLocaleDateString('en-GB');
            const to = selectedDate.to?.toLocaleDateString('en-GB');

            let tmp: ArrayStringProps = [];
            if ((from && mode === 'range' && from !== to) || (from && mode === 'single')) tmp.push(from);
            if (mode === 'range' && to && from !== to) tmp.push(to);
            tmp = joinArrayString(tmp, ' - ');

            console.log({ from, to });

            if (tmp) data = tmp;
        }

        // console.log({ selectedDate, mode });

        return data;
    }, [selectedDate, calendar?.mode]);

    let inputRef = { ref: ref };
    if (hook && inputHook) {
        inputRef = {
            ref: (e) => {
                inputHook?.ref(e);

                if (ref && 'current' in ref && e) (ref as any).current = e;
            },
        };
    }

    let placeholder = 'DD/MM/YYYY';
    if (calendar?.mode === 'range') placeholder = 'DD/MM/YYYY - DD/MM/YYYY';

    // let inputClass: ArrayStringProps = ['input input--day-picker'];
    // if (className) inputClass.push(className);
    // inputClass = joinArrayString(inputClass);

    return (
        <>
            <DropdownMenu>
                <div
                    className="flex items-center gap-x-1"
                    // className={inputClass}
                >
                    <input
                        type="text"
                        disabled
                        placeholder={placeholder}
                        defaultValue={value}
                        {...props}
                        {...inputHook}
                        {...inputRef}
                        //{...(hook ? { defaultValue: value } : { value: value })}
                        //{...(hook ? { defaultValue: value } : { value: value })}
                    />
                    <DropdownMenuTrigger asChild>
                        <CalendarDays
                            size={icon?.size ?? 16}
                            className="cursor-pointer"
                        />
                    </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                        <Calendar
                            className="px-2 py-1.5"
                            // mode={(calendar?.mode as any) || 'single'}
                            // mode={'range' || 'single'}
                            // mode={'single'}
                            mode="range"
                            // disabled={disabled}
                            // required={true}
                            selected={selectedDate}
                            onSelect={(selected) => {
                                // console.log('run');

                                // if (!selectedDate) return;
                                if (!selected) return;

                                setSelectedDate(selected);
                            }}
                            excludeDisabled={calendar?.mode !== 'range'}
                        />
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
});

InputDayPicker.displayName = 'InputDayPicker';
export default InputDayPicker;
