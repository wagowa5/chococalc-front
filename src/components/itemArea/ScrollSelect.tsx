import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface ScrollSelectProps {
  options: { value: number; label: string }[];
  label: string;
  selectedValue: string;
  onChange: (event: SelectChangeEvent) => void;
}

const ScrollSelect: React.FC<ScrollSelectProps> = ({
  options,
  label,
  selectedValue,
  onChange,
}) => {
  return (
    <FormControl>
      <InputLabel id={`select-${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`select-${label}-label`}
        id={`select-${label}`}
        value={selectedValue}
        onChange={onChange}
        autoWidth
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScrollSelect;
