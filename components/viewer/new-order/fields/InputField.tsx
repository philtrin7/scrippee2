import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes
} from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { FieldProps } from 'formik'

import {
  OrdersListState,
  NewOrder
} from '../../../../redux/ordersList/ordersList.types'
import { RootState } from '../../../../redux/store'
import {
  clearField,
  setNewOrder
} from '../../../../redux/ordersList/ordersList.actions'
import { Order } from '../../../../generated/graphql'

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
  setNewOrder: Function
  clearField: Function
  ordersList: OrdersListState
}

const InputField = ({
  ordersList,
  form,
  field,
  setNewOrder,
  clearField,
  ...formikProps
}: FormikPropTypes & ReduxProps) => {
  const { errors, touched, handleChange } = form
  const { onChange, value, name, ...fields } = field
  const errorMessage = touched[name] && errors[name]

  const getValueByKey = (obj: any, key: any) => {
    return Object.values(obj).find((value) => obj[key] === value)
  }

  const newOrder = ordersList.new[0]
  const storedValue = getValueByKey(newOrder, name)

  return (
    <div>
      {errorMessage && <div className="error-msg">{errorMessage}</div>}
      <div className={`form-group ${errorMessage ? 'with-error' : ''}`}>
        {name === 'item' ? (
          <textarea
            {...fields}
            {...formikProps}
            name={name}
            value={storedValue || value}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setNewOrder(name, e.target.value)
              } else {
                clearField(name)
              }
              handleChange(e)
            }}
            className={`form-control ${
              storedValue || value !== '' ? 'hasValue' : ''
            }`}
          />
        ) : (
          <input
            {...fields}
            {...formikProps}
            name={name}
            value={storedValue || value}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setNewOrder(name, e.target.value)
              } else {
                clearField(name)
              }
              handleChange(e)
            }}
            className={`form-control ${
              storedValue || value !== '' ? 'hasValue' : ''
            }`}
          />
        )}
      </div>
      <style jsx>{inputFieldStyles}</style>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  ordersList: state.ordersList
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNewOrder: (field: keyof NewOrder, value: Order[keyof NewOrder]) =>
    dispatch(setNewOrder(field, value)),
  clearField: (field: keyof NewOrder) => dispatch(clearField(field))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputField)
