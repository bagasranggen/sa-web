import React from 'react';

import { CalendarDays } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/shadcn/DropdownMenu';
import Calendar, { CalendarProps } from '@/components/common/Calendar';
import Button from '@/components/common/Button';

export type DetailCalendarProps = {
    selected?: DateRange;
    setSelected?: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
} & Pick<CalendarProps, 'disabled'>;

const DetailCalendar = ({ disabled, selected, setSelected }: DetailCalendarProps): React.ReactElement => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button.Block
                    as="button"
                    className="flex items-center justify-center">
                    <CalendarDays
                        size={16}
                        className="me-1"
                    />
                    Check Availability
                </Button.Block>
            </DropdownMenuTrigger>

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
