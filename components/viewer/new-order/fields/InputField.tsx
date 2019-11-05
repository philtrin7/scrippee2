import React, { useState, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { connect } from 'react-redux'
import { FieldProps } from 'formik'
import { Dispatch } from 'redux'
import { setTempOrder } from '../../../../redux/temp/temp.actions'

import inputFieldStyles from './inputField.styles.scss'

type FormikPropTypes = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  FieldProps

interface ReduxProps {
  setTempOrder: Function
}

const InputField = ({
  form,
  field,
  setTempOrder,
  ...formikProps
}: FormikPropTypes & ReduxProps) => {
  const { errors, touched, handleChange } = form
  const { onChange, value, ...fields } = field

  const errorMessage = touched[fields.name] && errors[fields.name]

  const [hasValue, setHasValue] = useState(false)

  return (
    <div>
      {errorMessage && <div className="error-msg">{errorMessage}</div>}
      <div className={`form-group ${errorMessage ? 'with-error' : ''}`}>
        <input
          {...fields}
          {...formikProps}
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setHasValue(true)
              if (fields.name === 'customerName') {
                setTempOrder({ customerName: e.target.value })
              }
              if (fields.name === 'item') {
                setTempOrder({ item: e.target.value })
              }
            } else {
              setHasValue(false)
              if (fields.name === 'customerName') {
                setTempOrder({ customerName: ' ' })
              }
              if (fields.name === 'item') {
                setTempOrder({ item: ' ' })
              }
            }
            handleChange(e)
          }}
          value={value}
          className={`form-control ${
            hasValue && value !== '' ? 'hasValue' : ''
          }`}
        />
      </div>
      <style jsx>{inputFieldStyles}</style>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTempOrder: (object: { [key: string]: string }) =>
    dispatch(setTempOrder(object))
})

export default connect(
  null,
  mapDispatchToProps
)(InputField)
