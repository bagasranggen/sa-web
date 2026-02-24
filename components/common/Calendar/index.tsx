import React from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import 'react-day-picker/style.css';

import { DayPicker, DayPickerProps } from 'react-day-picker';

export type CalendarProps = {} & DayPickerProps;

const Calendar = ({ disabled, className, startMonth = new Date(), ...props }: CalendarProps): React.ReactElement => {
    const currentDate = new Date();

    const disabledDates: DayPickerProps['disabled'] = [
        { before: new Date(currentDate.setDate(currentDate.getDate() + 1)) },
    ];
    if (disabled && Array.isArray(disabled)) disabledDates.push(...disabled);
    if (disabled && !Array.isArray(disabled)) disabledDates.push(disabled);

    let calendarClass: ArrayStringProps = ['calendar'];
    if (className) calendarClass.push(className);
    calendarClass = joinArrayString(calendarClass);

    return (
        <DayPicker
            className={calendarClass}
            startMonth={startMonth}
            disabled={disabledDates}
            {...props}
        />
    );
};

export default Calendar;
