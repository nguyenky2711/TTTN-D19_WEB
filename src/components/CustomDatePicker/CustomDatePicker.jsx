import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

function DatePickerWithLabel({
  label,
  className,
  requirementField = true,
  id,
  register,
  onChange,
  selectedDate,
  format,
  defaultValue,
  maxDate,
  placeholder,
  minDate,
  ...rest
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className='custom-input__label'>
        {label}
        {requirementField && label && (
          <span className='field-requirment'>*</span>
        )}
      </label>
      <DatePicker
        placeholderText={placeholder}
        todayButton='Hôm nay'
        dateFormat={format}
        selected={selectedDate}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
        maxDate={maxDate}
        minDate={minDate}
      />
    </div>
  );
}

export default DatePickerWithLabel;
