import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { navigate } from '@reach/router';

const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
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

const SignUpSchema = Yup.object().shape({
  team: Yup.object()
    .shape({
      name: Yup.string().required('Required')
    })
    .required(),
  name: Yup.string().required('Required'),
  password: Yup.string()
    .min(7, 'Too Short!')
    .max(129, 'Too Long!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

function SignUp() {
  const registerUser = useMutation(REGISTER_USER);

  return (
    <div>
      <h1>SignUp</h1>
      <Formik
        initialValues={{
          team: {
            name: ''
          },
          name: '',
          password: '',
          passwordConfirmation: '',
          email: ''
        }}
        validationSchema={SignUpSchema}
        onSubmit={input => {
          registerUser({
            variables: { input },
            update: (
              proxy,
              {
                data: {
                  registerUser: { uid, client, accessToken, errors }
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
            <Field name="team.name" />
            {errors.team &&
            errors.team.name &&
            touched.team &&
            touched.team.name ? (
              <div>{errors.team.name}</div>
            ) : null}
            <Field name="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
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

export default SignUp;
