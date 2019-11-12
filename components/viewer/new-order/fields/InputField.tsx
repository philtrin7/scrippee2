import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes
} from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { FieldProps } from 'formik'

import { setTempOrder, clearField } from '../../../../redux/temp/temp.actions'
import { TempState } from '../../../../redux/temp/temp.types'
import { RootState } from '../../../../redux/store'

import inputFieldStyles from './inputField.styles.scss'

type FormikPropTypes = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  FieldProps &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >

interface ReduxProps {
  setTempOrder: Function
  clearTempOrder: Function
  clearField: Function
  temp: TempState
}

const InputField = ({
  temp,
  form,
  field,
  setTempOrder,
  clearTempOrder,
  clearField,
  ...formikProps
}: FormikPropTypes & ReduxProps) => {
  const { errors, touched, handleChange } = form
  const { onChange, value, name, ...fields } = field
  const errorMessage = touched[name] && errors[name]

  const getValueByKey = (obj: any, key: any) => {
    return Object.values(obj).find((value) => obj[key] === value)
  }

  const tempOrder = temp.orders[0]
  const storedTempValue = getValueByKey(tempOrder, name)

  return (
    <div>
      {errorMessage && <div className="error-msg">{errorMessage}</div>}
      <div className={`form-group ${errorMessage ? 'with-error' : ''}`}>
        {name === 'item' ? (
          <textarea
            {...fields}
            {...formikProps}
            name={name}
            value={storedTempValue || value}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setTempOrder(name, e.target.value)
              } else {
                clearField(name)
              }
              handleChange(e)
            }}
            className={`form-control ${
              storedTempValue || value !== '' ? 'hasValue' : ''
            }`}
          />
        ) : (
          <input
            {...fields}
            {...formikProps}
            name={name}
            value={storedTempValue || value}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setTempOrder(name, e.target.value)
              } else {
                clearField(name)
              }
              handleChange(e)
            }}
            className={`form-control ${
              storedTempValue || value !== '' ? 'hasValue' : ''
            }`}
          />
        )}
      </div>
      <style jsx>{inputFieldStyles}</style>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  temp: state.temp
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTempOrder: (field: string, value: string) =>
    dispatch(setTempOrder(field, value)),
  clearField: (field: string) => dispatch(clearField(field))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputField)
