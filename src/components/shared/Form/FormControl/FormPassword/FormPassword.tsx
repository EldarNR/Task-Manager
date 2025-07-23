// libraries
import { type FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Button, FormGroup, InputGroup,
} from '@blueprintjs/core';

interface FormPasswordProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const FormPassword: FC<FormPasswordProps> = ({
  name,
  label,
  disabled,
  placeholder = 'Введите пароль',
}) => {
  const { control, formState: { errors } } = useFormContext();
  const fieldError = errors?.[name];
  const errorMessage: string | null = typeof fieldError?.message === 'string' ? fieldError.message : null;

  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

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
              rightElement={(
                <Button
                  icon={showPassword ? 'eye-off' : 'eye-open'}
                  minimal
                  onClick={toggleVisibility}
                />
                          )}
              type={showPassword ? 'text' : 'password'}
            />
          </FormGroup>
        )}
      />
      {errorMessage && <div className="validation-error">{errorMessage}</div>}
    </div>
  );
};
