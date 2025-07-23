import type { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { DateInput3 } from '@blueprintjs/datetime2';

import { ru } from 'date-fns/locale';

interface FormDatePickerProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

export const FormDatePicker: FC<FormDatePickerProps> = ({ name, label, disabled }) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedDate:string = watch(name);
  const fieldError = errors?.[name];
  const errorMessage: string | null = typeof fieldError?.message === 'string' ? fieldError.message : null;
  const errorId = `${name}-error`;

  const formatDate = (date: Date | null | undefined): string => (date ? date.toLocaleDateString('ru-RU') : '');

  return (
    <fieldset aria-describedby={errorMessage ? errorId : null} className="form-datepicker">
      {label && <legend className="form-label">{label}</legend>}

      <DateInput3
        aria-invalid={!!errorMessage}
        disabled={disabled}
        formatDate={formatDate}
        locale={ru}
        onChange={(newDate) => setValue(name, newDate)}
        placeholder="Выберите дату"
        value={selectedDate ?? null}
      />

      {errorMessage && (
        <div className="validation-error" id={errorId} role="alert">
          {errorMessage}
        </div>
      )}
    </fieldset>
  );
};
