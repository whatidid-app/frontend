import styled from '@emotion/styled';
import { lighten } from 'polished';

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #2d3a8c;
  border-radius: 2px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  color: #e0e8f9;
  letter-spacing: 0.2px;

  &:hover,
  &:focus {
    background-color: ${() => lighten(0.1, '#2d3a8c')};
    color: ${() => lighten(0.1, '#e0e8f9')};
  }

  &:disabled {
    cursor: not-allowed;
    border: none;
    background-color: #e4e7eb;
    color: #9aa5b1;
  }
`;

export default Button;
