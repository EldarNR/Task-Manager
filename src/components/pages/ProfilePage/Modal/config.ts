export const FILE_FORM_VALUE = [
  {
    fieldType: 'input' as const, label: 'ФИО', name: 'name', placeholder: 'Введите ваше ФИО',
  },
  {
    fieldType: 'input' as const, label: 'Email', name: 'email', placeholder: 'Введите ваш email',
  },
  {
    fieldType: 'fileInput' as const, label: 'Аватар', name: 'avatar', placeholder: 'Выберите файл аватара',
  },
];
