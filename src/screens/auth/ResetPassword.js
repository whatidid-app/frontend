import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import queryString from 'query-string';
import { navigate } from '@reach/router';
import { Card, Title, Input, Button, Link } from '../../patterns';
import { Box, Flex } from '@rebass/grid/emotion';
import isEmpty from 'lodash/isEmpty';

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
    .min(7, 'Password is too short')
    .max(129, 'Password is too long')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirmation is required')
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
      // navigate('/');
    }
  }, []);
}

function ResetPassword({ location, location: { origin, pathname } }) {
  const resetPassword = useMutation(RESET_PASSWORD);
  useAuthReset(`${origin}${pathname}`);
  return (
    <Box width={1}>
      <Title>Reset Password</Title>
      <Card>
        <Formik
          initialValues={{
            password: '',
            passwordConfirmation: ''
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={(input, { setSubmitting }) => {
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
                  setSubmitting(false);
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
          {({ errors, touched, isSubmitting, dirty }) => (
            <Form noValidate>
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
                Submit
              </Button>
              <Flex
                mt="20px"
                alignItems="center"
                justifyContent="space-between">
                <Link to="/login">login</Link>
                <Link to="/register">register</Link>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}

export default ResetPassword;
