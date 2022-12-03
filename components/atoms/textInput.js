import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  height: ${props => props.height || '2rem'};
  padding: ${props => props.padding || '0.3rem'};
  border-radius: 5px;
  border: 1px solid #bbb;
  margin: ${(props) => props.margin};
  font-weight: ${props => props.fontWeight || 'normal'};
  font-size: ${props => props.fontSize || '16px'};
`;

export default function TextArea(props) {
  return (
    <StyledInput
      type={props.type}
      id={props.name}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      required={props.required}
      onChange={props.onChangeEvent}
      disabled={props.disabled}
      onKeyDown={props.onKeyDownEvent}
      {...props.register(props.name)}
      // style 요소
      margin={props.margin}
      height={props.height}
      padding={props.padding}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
    ></StyledInput>
  );
}
