import React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { DateRange } from 'react-day-picker';

import { cn, formatDate } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '../ui/button';

interface DatepickerRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  placeholder?: string;
  value: DateRange | undefined;
  onSelect: (date: DateRange | undefined) => void;
}

export function DatepickerRange({
  className,
  placeholder,
  value,
  onSelect
}: DatepickerRangeProps) {
  return (
    <div className={cn('grid w-full gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal md:w-[220px]',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2" />
            {value?.from ? (
              value.to ? (
                <>
                  {formatDate(value.from, 'DD/MM/YYYY')} -{' '}
                  {formatDate(value.to, 'DD/MM/YYYY')}
                </>
              ) : (
                formatDate(value.from, 'DD/MM/YYYY')
              )
            ) : (
              <span>{placeholder ?? 'Pick a date'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
