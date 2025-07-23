// libraries
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { HTMLSelect } from '@blueprintjs/core';
// types
import type { SelectOption } from 'types/types';

interface FormSelectProps {
  name: string;
  label?: string;
  options: SelectOption<string | number>[];
  placeholder?: string;
  disabled?: boolean;
}

export const FormSelect: FC<FormSelectProps> = ({
  name, label, options, placeholder, disabled,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const fieldError = errors?.[name];
  const errorMessage: string | null = typeof fieldError?.message === 'string' ? fieldError.message : null;

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <HTMLSelect
            id={name}
            {...field}
            disabled={disabled}
            options={[{ label: placeholder || 'Выберите...', value: 0 }, ...options]}
          />
        )}
      />
      {errorMessage && <div className="validation-error">{errorMessage}</div>}
    </div>
  );
};
