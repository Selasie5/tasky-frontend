// components/FormWrapper.tsx
import { Formik, Form, FormikHelpers } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { FormikValues } from 'formik';

interface FormWrapperProps<T extends FormikValues> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
  children: React.ReactNode;
  submitButtonText?: string | React.ReactNode;
}

export function FormWrapper<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  submitButtonText = 'Submit',
}: FormWrapperProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="flex flex-col w-full">
        {children}
        <button
          type="submit"
          className="bg-purple-800 text-white font-normal py-2 px-4 rounded-md hover:bg-purple-800 transition-all mt-4"
        >
          {submitButtonText}
        </button>
      </Form>
    </Formik>
  );
}
