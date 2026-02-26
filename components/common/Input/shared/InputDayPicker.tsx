'use client';

import React, { forwardRef, useMemo, useState } from 'react';

import { BaseRegularInputProps, InputRegularRef } from '@/libs/@types';
import { createInputHooks } from '@/libs/factory';
import { getInputDayPickerValue } from '@/libs/utils';

import { CalendarDays, LucideProps } from 'lucide-react';
import { DateRange, PropsRange, PropsSingle } from 'react-day-picker';

import { BaseInputHookProps } from '@/components/common/Input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/shadcn/DropdownMenu';
import Calendar from '@/components/common/Calendar';

export type BaseInputDayPickerProps = {
    calendar?: {
        onSelect?: (day: DateRange | Date) => void;
    } & (PropsSingle | PropsRange);
    icon?: Pick<LucideProps, 'size'>;
} & Omit<BaseRegularInputProps, 'type' | 'disabled' | 'placeholder' | 'value'>;

export type InputDayPickerProps = BaseInputDayPickerProps & BaseInputHookProps;

const InputDayPicker = forwardRef<InputRegularRef, InputDayPickerProps>(({ hook, calendar, icon, ...props }, ref) => {
    const inputHook = createInputHooks(hook, props);
    const [selectedDate, setSelectedDate] = useState<PropsSingle['selected'] | PropsRange['selected']>(undefined);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const value = useMemo(() => {
        return getInputDayPickerValue({ date: selectedDate, mode: calendar?.mode });
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

    return (
        <>
            <DropdownMenu open={isOpen}>
                <div className="flex items-center gap-x-1">
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
                    <DropdownMenuTrigger
                        asChild
                        onClick={() => setIsOpen((prevState) => !prevState)}>
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
                            {...(calendar as any)}
                            selected={selectedDate}
                            onSelect={(selected: DateRange | Date | undefined) => {
                                if (!selected) return;

                                setSelectedDate(selected);
                                if (calendar?.onSelect) calendar.onSelect(selected);

                                const date = getInputDayPickerValue({ date: selected, mode: calendar?.mode });
                                if (date) setIsOpen(false);
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
