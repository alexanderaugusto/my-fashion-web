import React from "react"
import {
  FormGroup,
  Input,
  Label
} from "reactstrap"

export default function InputAddon({ inputState, type, className, size, label, placeholder, value, onChange, onFocus,
  onBlur, maxLength }) {

  return (
    <div>
      <FormGroup className={className + " " + inputState}>
        {!label ? null :
          <Label> {label} </Label>}
        <Input type={type}
          size={size}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e)}
          onFocus={onFocus === undefined ? null : e => onFocus(e)}
          onBlur={onBlur === undefined ? null : e => onBlur(e)}
          maxLength={maxLength}
        />
      </FormGroup>
    </div>
  )
}