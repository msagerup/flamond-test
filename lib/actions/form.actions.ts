'use server';

export const productOrderFormData = async (
  prevState: any,
  formData: FormData
) => {
  console.log(formData, 'running', prevState);
  try {
    return { message: 'hello' };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};
