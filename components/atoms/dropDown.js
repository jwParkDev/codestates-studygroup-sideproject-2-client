import styled from 'styled-components';

const StyledDropDown = styled.select`
  border: 1px solid #bbb;
  border-radius: 5px;
  height: ${props => props.height || '2rem'};
  padding: 0.3rem;
  margin: ${(props) => props.margin};
`;

export default function DropDown(props) {
  return (
    <StyledDropDown
      required={props.required}
      key={props.defaultValue}
      defaultValue={props.defaultValue}
      name={props.name}
      margin={props.margin}
      height={props.height}
      {...props.register(props.name)}
    >
      {props.optionList.map((el) => {
        return (
          <option value={el.optionValue} key={el.id}>
            {el.optionName}
          </option>
        );
      })}
    </StyledDropDown>
  );
}
