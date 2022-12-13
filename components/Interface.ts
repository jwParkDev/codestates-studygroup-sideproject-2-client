export interface StyleBase {
  width?: string,
  height?: string,
  color?: string,
  fontWeight?: string,
  fontSize?: string,
  backgroundColor?: string,
  hoverBackground?: string,
  margin?: string,
  padding?: string,
}

export interface FormValue {
	username: string,
	password: string,
  dateOfBirth: string,
  gender: string,
  name: string,
  email_front: string,
  email_back?: string,
  email_back_select?: string,
  countryCode: string,
  phone_front: string,
  phone_middle: string,
  phone_back: string,
  introduction?: string,
}

export interface RegisterType {
  onChange(e?:React.ChangeEvent): React.ChangeEventHandler,
  onBlur(e?:React.ChangeEvent): React.ChangeEventHandler,
  ref: React.Ref<any>,
  name: string,
}