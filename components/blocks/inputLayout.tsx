import React from 'react';
import styled from 'styled-components';

const InputLayoutDiv = styled.div<{ width: string }>`
  display: flex;
  align-items: center;
  width: ${(props) => props.width || '30rem'};
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  width: 20%;
  text-align: center;
`;

const InputWrapperSpan = styled.span`
  display: flex;
  align-items: center;
  width: 80%;
`;

interface InputLayoutPropsTypes {
  for: string,
  label: string,
  children: React.ReactNode,
  className?: string,
  width?: string,
}

export default function InputLayout(props:InputLayoutPropsTypes):React.ReactElement {
  return (
    <InputLayoutDiv className={props.className} width={props.width}>
      <InputLabel htmlFor={props.for}>{props.label}</InputLabel>
      <InputWrapperSpan>{props.children}</InputWrapperSpan>
    </InputLayoutDiv>
  );
}
