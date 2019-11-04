import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { FieldProps } from 'formik'

import inputFieldStyles from './inputField.styles.scss'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const InputField = (formikProps: FieldProps & InputProps) => {
  const { errors, touched, handleChange } = formikProps.form
  const { onChange, value, ...fields } = formikProps.field

  const errorMessage = touched[fields.name] && errors[fields.name]

  return (
    <div>
      <div className="form-group">
        <input
          {...fields}
          {...formikProps}
          onChange={(e) => {
            handleChange(e)
          }}
        />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
      <style jsx>{inputFieldStyles}</style>
    </div>
  )
}

export default InputField
