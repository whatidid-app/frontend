import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
      errors
    }
  }
`;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

function ForgotPassword() {
  const forgotPassword = useMutation(FORGOT_PASSWORD);

  return (
    <div>
      <h1>Forgot Password</h1>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={input => {
          forgotPassword({
            variables: { input },
            update: (
              proxy,
              {
                data: {
                  forgotPassword: { success, errors }
                }
              }
            ) => {
              if (errors) {
                console.log(errors);
              } else {
                console.log('email sent');
              }
            }
          });
        }}>
        {({ errors, touched }) => (
          <Form noValidate>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
