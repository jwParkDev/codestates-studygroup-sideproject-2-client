import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  width: 100%;
  height: ${(props) => props.height};
  padding: 0.3rem;
  border: 1px solid #bbb;
  border-radius: 5px;
`;

export default function TextArea(props) {
  return (
    <StyledTextarea
      id={props.name}
      name={props.name}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      height={props.height}
      onChange={props.onChangeEvent}
      {...props.register(props.name)}
    ></StyledTextarea>
  );
}
