// libraries
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const FormInput: FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  disabled,
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
            <InputGroup
              {...field}
              disabled={disabled}
              id={name}
              intent={fieldState.invalid ? 'danger' : 'none'}
              placeholder={placeholder}
            />
          </FormGroup>
        )}
      />
      {errorMessage && <div className="validation-error">{errorMessage}</div>}
    </div>
  );
};
