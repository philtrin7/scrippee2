import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { FieldProps } from 'formik'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name]
  return (
    <div>
      <input {...field} {...props} />
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

export default InputField
