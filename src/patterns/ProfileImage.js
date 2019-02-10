import styled from '@emotion/styled';

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  outline: 0;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover,
  &:focus {
    border: 2px solid #74b0fd;
  }
`;

export default ProfileImage;
