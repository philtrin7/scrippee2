import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import { FieldProps } from 'formik'

import inputFieldCommentStyles from './inputFieldComment.styles.scss'

type FormikPropTypes = FieldProps &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >

interface ReduxProps {}

const InputFieldComment = ({
  form,
  field,
  ...formikProps
}: FormikPropTypes & ReduxProps) => {
  const { errors, touched, handleChange, handleSubmit } = form
  const { onChange, value, name, ...fields } = field
  const errorMessage = touched[name] && errors[name]

  return (
    <div>
      {errorMessage && <div className="error-msg">{errorMessage}</div>}
      <div className={`form-group ${errorMessage ? 'with-error' : ''}`}>
        <textarea
          {...fields}
          {...formikProps}
          name={name}
          value={value}
          onChange={(e) => {
            handleChange(e)
          }}
          onKeyDown={(e) => {
            if (e.keyCode == 13 && e.shiftKey == false) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          className="form-control"
        />
      </div>
      <style jsx>{inputFieldCommentStyles}</style>
    </div>
  )
}

export default InputFieldComment
