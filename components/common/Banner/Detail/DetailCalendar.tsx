import React, { PropsWithChildren } from 'react';

import { DateRange } from 'react-day-picker';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/shadcn/DropdownMenu';
import Calendar, { CalendarProps } from '@/components/common/Calendar';

export type DetailCalendarProps = {
    selected?: DateRange;
    setSelected?: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
} & (Pick<CalendarProps, 'disabled'> & PropsWithChildren);

const DetailCalendar = ({
    disabled,
    selected,
    setSelected,
    children,
}: DetailCalendarProps): React.ReactElement | null => {
    if (!children) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <Calendar
                        className="px-2 py-1.5"
                        mode="range"
                        disabled={disabled}
                        selected={selected}
                        onSelect={(selected) => {
                            if (!setSelected) return;
                            if (!selected) return;

                            setSelected(selected);
                        }}
                        excludeDisabled
                    />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DetailCalendar;
