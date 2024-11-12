import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { OptionType } from '@/types';
import { X } from 'lucide-react';
import React from 'react';

interface BaseSelectProps {
  placeholder: string;
  options: OptionType[];
  value: string;
  onChange: (val: string) => void;
}

export function BaseSelect({
  placeholder,
  options,
  value,
  onChange
}: BaseSelectProps) {
  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onChange('');
  };

  return (
    <div className="relative w-full">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="w-full cursor-default md:w-48"
          isArrow={value === ''}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {value !== '' && (
        <span
          className="absolute right-2 top-[0.6rem] cursor-pointer bg-background"
          onClick={handleClear}
        >
          <X className="size-4" />
        </span>
      )}
    </div>
  );
}
