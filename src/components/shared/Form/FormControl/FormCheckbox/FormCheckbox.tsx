// libraries
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from '@blueprintjs/core';

interface FormCheckboxProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

export const FormCheckbox: FC<FormCheckboxProps> = ({ name, label, disabled }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name];
  const errorMessage: string | null = typeof fieldError?.message === 'string' ? fieldError.message : null;

  const errorId = `${name}-error`;

  return (
    <div>
      <legend className="sr-only">{label}</legend>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox
            {...field}
            aria-describedby={errorMessage ? errorId : null}
            aria-invalid={!!errorMessage}
            checked={!!field.value}
            disabled={disabled}
            label={label}
            onChange={({ currentTarget: { checked } }) => field.onChange(checked)}
          />
        )}
      />
      {errorMessage && (
        <div className="validation-error" id={errorId} role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
