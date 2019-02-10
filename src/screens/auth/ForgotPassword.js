import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Card, Title, Input, Button, Link } from '../../patterns';
import { Box, Flex } from '@rebass/grid/emotion';
import isEmpty from 'lodash/isEmpty';

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
    .email('Please enter a valid email address')
    .required('Email address is required')
});

function ForgotPassword() {
  const forgotPassword = useMutation(FORGOT_PASSWORD);

  return (
    <Box width={1}>
      <Title>Forgot Password</Title>
      <Card>
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(input, { setSubmitting, resetForm }) => {
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
                  setSubmitting(false);
                  console.log(errors);
                } else {
                  resetForm();
                  console.log('email sent');
                }
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
              <Button
                type="submit"
                disabled={isSubmitting || !isEmpty(errors) || !dirty}>
                Send Reset Email
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

export default ForgotPassword;
