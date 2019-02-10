import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { navigate } from '@reach/router';
import { LoginCard, Title, Input, Button, Link } from '../../patterns';
import { Box, Flex } from '@rebass/grid/emotion';
import isEmpty from 'lodash/isEmpty';
import { AlertService } from '../../lib';

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
      name: Yup.string().required('Team name is required')
    })
    .required(),
  name: Yup.string().required('Name is required'),
  password: Yup.string()
    .min(7, 'Password is too short')
    .max(129, 'Password is too long')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirmation is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required')
});

function SignUp() {
  const registerUser = useMutation(REGISTER_USER);

  return (
    <Box width={1}>
      <Title>Register</Title>
      <LoginCard>
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
          onSubmit={(input, { setSubmitting }) => {
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
                  AlertService('error', errors);
                  setSubmitting(false);
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
          {({ errors, touched, isSubmitting, dirty }) => (
            <Form noValidate>
              <Field name="team.name">
                {props => {
                  return <Input labelName="Team Name" type="text" {...props} />;
                }}
              </Field>
              <Field name="name">
                {props => {
                  return <Input labelName="Name" type="text" {...props} />;
                }}
              </Field>
              <Field name="email">
                {props => {
                  return <Input labelName="Email" type="email" {...props} />;
                }}
              </Field>
              <Field name="password">
                {props => {
                  return (
                    <Input labelName="Password" type="password" {...props} />
                  );
                }}
              </Field>
              <Field name="passwordConfirmation">
                {props => {
                  return (
                    <Input
                      css={{ marginBottom: '32px' }}
                      labelName="Password Confirmation"
                      type="password"
                      {...props}
                    />
                  );
                }}
              </Field>
              <Button
                type="submit"
                disabled={isSubmitting || !isEmpty(errors) || !dirty}>
                Register
              </Button>
              <Flex
                mt="20px"
                alignItems="center"
                justifyContent="space-between">
                <Link to="/forgot-password">forgot password</Link>
                <Link to="/login">login</Link>
              </Flex>
            </Form>
          )}
        </Formik>
      </LoginCard>
    </Box>
  );
}

export default SignUp;
