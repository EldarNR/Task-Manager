// libraries
import type { FC } from 'react';
// components
import { FormCheckbox } from 'components/shared/Form/FormControl/FormCheckbox';
import { FormDatePicker } from 'components/shared/Form/FormControl/FormDatePicker';
import { FormFileInput } from 'components/shared/Form/FormControl/FormFileInput';
import { FormInput } from 'components/shared/Form/FormControl/FormInput';
import { FormPassword } from 'components/shared/Form/FormControl/FormPassword';
import { FormSelect } from 'components/shared/Form/FormControl/FormSelect';
import { FormTextarea } from 'components/shared/Form/FormControl/FormTextarea';
// types
import type { FormControlProps } from 'components/shared/Form/FormControl/types';

export const FormControl: FC<FormControlProps> = (props) => {
  const { fieldType } = props;

  switch (fieldType) {
    case 'select':
      return <FormSelect {...props} />;

    case 'input':
      return <FormInput {...props} />;

    case 'textarea':
      return <FormTextarea {...props} />;

    case 'checkbox':
      return <FormCheckbox {...props} />;

    case 'datePicker':
      return <FormDatePicker {...props} />;

    case 'fileInput':
      return <FormFileInput {...props} />;

    case 'password':
      return <FormPassword {...props} />;

    default:
      return null;
  }
};
