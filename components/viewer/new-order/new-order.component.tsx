import React from 'react'
import ReactSVG from 'react-svg'

import { toast } from 'react-toastify'
import { Formik, Field, Form } from 'formik'
import InputField from './fields/InputField'

import { Order } from '../../../redux/list/list.types'
import { formatValidationErrors } from '../../../lib/utils/formatError'
import {
  useCreateOrderMutation,
  CreateOrderMutationVariables
} from '../../../generated/graphql'

import newOrderViewerStyles from './new-order.styles.scss'

type OrderForm = Pick<Order, 'customerName' | 'item' | 'contactNum' | 'email'>

interface Props {}

const NewOrderViewer: React.FC<Props> = () => {
  const [createOrder] = useCreateOrderMutation()

  const handleSubmit = async (
    data: CreateOrderMutationVariables,
    setErrors: Function
  ) => {
    try {
      await createOrder({
        variables: {
          item: data.item,
          customerName: data.customerName,
          email: data.email,
          contactNum: data.contactNum
        }
      })
    } catch (ApolloError) {
      const validationErrors = formatValidationErrors(ApolloError)
      if (validationErrors) {
        toast.error('There were problem(s) creating your order.')
        setErrors(validationErrors)
      } else {
        console.log('Error: ', 'Unexpected error. Path: ["createOrder"]')
      }
    }
  }
  return (
    <div className="new-order-viewer">
      <div className="new-order-content">
        <div className="new-order-header">
          <h5>
            New Order
            <ReactSVG wrapper={'span'} src="/static/img/svg/new-order.svg" />
          </h5>

          <button type="button" className="btn round">
            <i>
              <ReactSVG src="/static/img/svg/close.svg" />
            </i>
          </button>
        </div>
        <div className="new-order-body">
          <div className="details">
            <Formik<OrderForm>
              initialValues={{
                customerName: '',
                item: '',
                contactNum: '',
                email: ''
              }}
              onSubmit={(data, { setErrors }) => handleSubmit(data, setErrors)}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {() => (
                <Form>
                  <Field
                    name="customerName"
                    className="form-control"
                    placeholder="Customer name"
                    component={InputField}
                  />
                  <Field
                    name="item"
                    className="form-control"
                    placeholder="Items"
                    component={InputField}
                  />
                  <Field
                    name="contactNum"
                    className="form-control"
                    placeholder="Contact number"
                    component={InputField}
                  />
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    component={InputField}
                  />
                  <div className="new-order-footer">
                    <button className="btn primary" type="submit">
                      Create Order
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <style jsx>{newOrderViewerStyles}</style>
    </div>
  )
}

export default NewOrderViewer
