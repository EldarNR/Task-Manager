export const convertFileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      resolve(reader.result);
    } else {
      reject(new Error('Ошибка! Не корректный тип'));
    }
  };

  reader.onerror = (error) => reject(error);
});
