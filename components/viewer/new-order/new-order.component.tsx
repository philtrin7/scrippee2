import React from 'react'
import ReactSVG from 'react-svg'
import { Formik, Field, Form } from 'formik'

import newOrderViewerStyles from './new-order.styles.scss'
import InputField from './fields/InputFied'
import { Order } from '../../../redux/list/list.types'
import {
  useCreateOrderMutation,
  CreateOrderMutationVariables
} from '../../../generated/graphql'

type OrderForm = Pick<Order, 'customerName' | 'item' | 'contactNum' | 'email'>

interface Props {}

const NewOrderViewer: React.FC<Props> = () => {
  const [createOrder] = useCreateOrderMutation()

  const handleSubmit = async (
    data: CreateOrderMutationVariables,
    setErrors: any
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
    } catch (error) {
      const errors: { [key: string]: string } = {}
      if (
        error.graphQLErrors[0].extensions.exception.name === 'ValidationError'
      ) {
        error.graphQLErrors[0].extensions.exception.inner.forEach(
          (validationErr: any) => {
            errors[validationErr.path] = validationErr.message
          }
        )
      } else {
        throw new Error('Unexpected error["createOrder"]')
      }
      setErrors(errors)
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
                  placeholder="Customer name"
                  component={InputField}
                />
                <Field name="item" placeholder="Items" component={InputField} />
                <Field
                  name="contactNum"
                  placeholder="Contact number"
                  component={InputField}
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  component={InputField}
                />
                <button type="submit">submit</button>
              </Form>
            )}
          </Formik>
          <div className="details">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="What's the topic?"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  placeholder="Hmm, are you friendly?"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="new-order-footer">
          <button type="submit" className="btn primary">
            Create Order
          </button>
        </div>
      </div>
      <style jsx>{newOrderViewerStyles}</style>
    </div>
  )
}

export default NewOrderViewer
