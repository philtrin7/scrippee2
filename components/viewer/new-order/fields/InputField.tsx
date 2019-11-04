import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { FieldProps } from 'formik'

import inputFieldStyles from './inputField.styles.scss'

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
      <div className="form-group">
        <input {...field} {...props} />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
      <style jsx>{inputFieldStyles}</style>
    </div>
  )
}

export default InputField
