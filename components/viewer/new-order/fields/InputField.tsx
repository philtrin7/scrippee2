import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
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

  return (
    <div>
      <div className="form-group">
        <input
          {...fields}
          {...formikProps}
          onChange={(e) => {
            if (e.target.value.length > 0) {
              if (fields.name === 'customerName') {
                setTempOrder({ customerName: e.target.value })
              }
              if (fields.name === 'item') {
                setTempOrder({ item: e.target.value })
              }
            } else {
              if (fields.name === 'customerName') {
                setTempOrder({ customerName: ' ' })
              }
              if (fields.name === 'item') {
                setTempOrder({ item: ' ' })
              }
            }
            handleChange(e)
          }}
        />
        {errorMessage && <div>{errorMessage}</div>}
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
