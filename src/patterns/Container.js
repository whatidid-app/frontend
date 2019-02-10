import styled from '@emotion/styled';
import { Box } from '@rebass/grid/emotion';

const Container = styled(Box)`
  max-width: 1240px;
  padding: 0 20px;
`;

Container.defaultProps = {
  mx: 'auto'
};

export default Container;
