interface BaseProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface InputProps extends BaseProps {
  fieldType: 'input';
}

export interface PasswordProps extends BaseProps {
  fieldType: 'password';
}

export interface TextareaProps extends BaseProps {
  fieldType: 'textarea';
  rows?: number;
}

export interface SelectProps extends BaseProps {
  fieldType: 'select',
  options: { label: string; value: string | number }[];
  multiple?: boolean;
}

export interface CheckboxProps extends BaseProps {
  fieldType: 'checkbox';
}

export interface DatePickerProps extends BaseProps {
  fieldType: 'datePicker';
}

export interface FileInputProps extends BaseProps {
  fieldType: 'fileInput';
}

export type FormControlProps =
    | InputProps
    | SelectProps
    | CheckboxProps
    | TextareaProps
    | FileInputProps
    | PasswordProps
    | DatePickerProps;
