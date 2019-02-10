import styled from '@emotion/styled';
import { Flex } from '@rebass/grid/emotion';

const Center = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

Center.defaultProps = {
  mx: 'auto'
};

export default Center;
