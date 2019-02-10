import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { navigate } from '@reach/router';

const SIGN_OUT = gql`
  mutation signOutUser($input: SignOutUserInput!) {
    signOutUser(input: $input) {
      success
    }
  }
`;

const signOut = signOutMutation => {
  try {
    if (localStorage.getItem('auth_headers') !== null) {
      const { uid, client } = JSON.parse(localStorage.getItem('auth_headers'));
      signOutMutation({
        variables: { input: { uid, client } },
        update: (
          proxy,
          {
            data: {
              signOutUser: { success }
            }
          }
        ) => {
          localStorage.removeItem('auth_headers');
          navigate('/login');
        }
      });
    }
  } catch (e) {
    localStorage.removeItem('auth_headers');
  }
};

function SignOut() {
  const signOutMutation = useMutation(SIGN_OUT);
  signOut(signOutMutation);
  return null;
}

export default SignOut;
