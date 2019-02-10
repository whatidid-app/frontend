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
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: Yup.string().required('Password is required')
});

function SignIn() {
  const signInUser = useMutation(SIGN_IN_USER);

  return (
    <Box width={1}>
      <Title>Login</Title>
      <LoginCard>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={SignInSchema}
          onSubmit={(input, { setSubmitting }) => {
            return signInUser({
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
              <Field name="email">
                {props => {
                  return <Input labelName="Email" type="email" {...props} />;
                }}
              </Field>
              <Field name="password">
                {props => {
                  return (
                    <Input
                      css={{ marginBottom: '32px' }}
                      labelName="Password"
                      type="password"
                      {...props}
                    />
                  );
                }}
              </Field>
              <Button
                type="submit"
                disabled={isSubmitting || !isEmpty(errors) || !dirty}>
                Login
              </Button>
              <Flex
                mt="20px"
                alignItems="center"
                justifyContent="space-between">
                <Link to="/forgot-password">forgot password</Link>
                <Link to="/register">register</Link>
              </Flex>
            </Form>
          )}
        </Formik>
      </LoginCard>
    </Box>
  );
}

export default SignIn;
