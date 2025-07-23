// libraries
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormGroup, TextArea } from '@blueprintjs/core';

export interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

export const FormTextarea: FC<TextareaProps> = ({
  name,
  label,
  placeholder,
  disabled,
  rows = 1,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const fieldError = errors?.[name];
  const errorMessage: string | null = typeof fieldError?.message === 'string' ? fieldError.message : null;

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormGroup
            helperText={fieldState.error?.message}
            intent={fieldState.invalid ? 'danger' : 'none'}
            label={label}
            labelFor={name}
          >
            <TextArea
              {...field}
              disabled={disabled}
              fill
              growVertically={false}
              id={name}
              intent={fieldState.invalid ? 'danger' : 'none'}
              placeholder={placeholder}
              rows={rows}
            />
          </FormGroup>
        )}
      />
      {errorMessage && <div className="validation-error">{errorMessage}</div>}
    </div>
  );
};
