// libraries
import type { ReactNode } from 'react';
import type { SubmitHandler, UseFormProps } from 'react-hook-form';

export interface FormProps<TFormValues> extends UseFormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactNode;
  className?: string;
}
