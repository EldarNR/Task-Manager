// libraries
import { FormProvider, useForm } from 'react-hook-form';
// types
import type { FormProps } from 'components/shared/Form/types';

export const Form = <TFormValues extends Record<string, any>>({
  onSubmit,
  children,
  className,
  ...formOptions
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>(formOptions);

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
