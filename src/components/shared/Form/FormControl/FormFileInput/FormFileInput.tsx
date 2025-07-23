// libraries
import type { ChangeEvent, FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFileInputProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export const FormFileInput: FC<FormFileInputProps> = ({
  name, label, accept, multiple, disabled,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const fieldError = errors?.[name];
  const errorMessage: string | null = typeof fieldError?.message === 'string' ? fieldError.message : null;

  const errorId = `${name}-error`;

  return (
    <fieldset
      aria-describedby={errorMessage ? errorId : null}
      className="form-file-input"
    >
      {label && <legend className="form-label">{label}</legend>}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            accept={accept}
            aria-describedby={errorMessage ? errorId : null}
            aria-invalid={!!errorMessage}
            disabled={disabled}
            id={name}
            multiple={multiple}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const { files } = e.target;

              field.onChange(multiple ? files : files?.[0] ?? null);
            }}
            type="file"
          />
        )}
      />

      {errorMessage && (
        <div className="validation-error" id={errorId} role="alert">
          {errorMessage}
        </div>
      )}
    </fieldset>
  );
};
