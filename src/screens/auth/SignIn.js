import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { navigate } from '@reach/router';

const SIGN_IN_USER = gql`
  mutation signInUser($input: SignInUserInput!) {
    signInUser(input: $input) {
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

const SignInSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});

function SignIn() {
  const signInUser = useMutation(SIGN_IN_USER);

  return (
    <div>
      <h1>SignIn</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={SignInSchema}
        onSubmit={input => {
          signInUser({
            variables: { input },
            update: (
              proxy,
              {
                data: {
                  signInUser: { uid, client, accessToken, errors }
                }
              }
            ) => {
              if (errors) {
                console.log(errors);
                return;
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
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignIn;
