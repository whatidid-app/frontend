import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import queryString from 'query-string';
import { navigate } from '@reach/router';

const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      uid
      client
      tokenType
      accessToken
      user {
        teams {
          id
          name
        }
      }
      errors
    }
  }
`;

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(7, 'Too Short!')
    .max(129, 'Too Long!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required')
});

function useAuthReset(url) {
  useEffect(() => {
    const params = queryString.parse(window.location.search);
    if (params.uid && params.token && params.client_id) {
      window.setTimeout(() => {
        localStorage.setItem(
          'auth_headers',
          JSON.stringify({
            uid: params.uid,
            client: params.client_id,
            'access-token': params.token
          })
        );

        window.history.replaceState({}, document.title, url);
      }, 0);
    } else {
      navigate('/');
    }
  }, []);
}

function ResetPassword({ location, location: { origin, pathname } }) {
  const resetPassword = useMutation(RESET_PASSWORD);
  useAuthReset(`${origin}${pathname}`);
  return (
    <div>
      <h1>Reset Password</h1>
      <Formik
        initialValues={{
          password: '',
          passwordConfirmation: ''
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={input => {
          resetPassword({
            variables: { input },
            update: (
              proxy,
              {
                data: {
                  resetPassword: { uid, client, accessToken, errors }
                }
              }
            ) => {
              if (errors) {
                console.log(errors);
              }

              localStorage.setItem(
                'auth_headers',
                JSON.stringify({ uid, client, 'access-token': accessToken })
              );

              navigate('/');
            }
          });
        }}>
        {({ errors, touched }) => (
          <Form noValidate>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Field name="passwordConfirmation" type="password" />
            {errors.passwordConfirmation && touched.passwordConfirmation ? (
              <div>{errors.passwordConfirmation}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResetPassword;
