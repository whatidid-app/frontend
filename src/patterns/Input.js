import React from 'react';
import styled from '@emotion/styled';
import { Flex } from '@rebass/grid/emotion';
import { get } from 'lodash';

const Input = styled.input`
  font-size: 24px;
  background: #e4e7eb;
  border: none;
  border-radius: 2px;
  display: block;
  width: 100%;
  margin: 8px 0 22px;
  padding: 5px;
  box-sizing: border-box;
  color: #3e4c59;
  font-weight: 300;
`;

const LabelName = styled.span`
  font-weight: 500;
  font-size: 18px;
  color: #52606d;
`;

const ErrorField = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #ef4e4e;
`;

const WrappedInput = ({
  field,
  form: { errors, touched },
  labelName,
  ...props
}) => {
  return (
    <>
      <label css={{ display: 'block' }}>
        <Flex alignItems="center" justifyContent="space-between">
          <LabelName>{labelName}</LabelName>
          {get(errors, field.name) && get(touched, field.name) && (
            <ErrorField>* {get(errors, field.name)}</ErrorField>
          )}
        </Flex>
        <Input {...props} {...field} />
      </label>
    </>
  );
};

export default WrappedInput;
