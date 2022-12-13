import React from 'react';
import styled from 'styled-components';
import { StyleBase, RegisterType } from '../Interface';

const StyledDropDown = styled.select<StyleBase>`
  border: 1px solid #bbb;
  border-radius: 5px;
  height: ${props => props.height || '2rem'};
  padding: 0.3rem;
  margin: ${(props) => props.margin};
`;

interface DropDownPropsTypes extends StyleBase {
  required?: boolean,
  defaultValue?: string,
  name?: string,
  optionList: Array<{optionValue: string, id: string | number, optionName: string}>,
  register(name:string): any,
}

export default function DropDown(props:DropDownPropsTypes):React.ReactElement {
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
