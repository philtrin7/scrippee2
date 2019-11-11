import React from 'react'
import ReactSVG from 'react-svg'
import Router from 'next/router'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { toast } from 'react-toastify'
import { Formik, Field, Form } from 'formik'
import InputField from './fields/InputField'
import PulseLoader from 'react-spinners/PulseLoader'

import { formatValidationErrors } from '../../../lib/utils/formatError'
import {
  useCreateOrderMutation,
  CreateOrderMutationVariables,
  UserQuery,
  UserDocument,
  Order
} from '../../../generated/graphql'

import { clearTempOrder } from '../../../redux/temp/temp.actions'
import { selectOrder } from '../../../redux/selectOrder/selectOrder.actions'
import { setOrderView } from '../../../redux/viewer/viewer.actions'

import viewerStyles from '../viewer.styles.scss'

type OrderForm = Pick<Order, 'customerName' | 'item' | 'contactNum' | 'email'>

interface Props {
  clearTempOrder: Function
  selectOrder: Function
  setOrderView: Function
}

const NewOrderViewer: React.FC<Props> = (props) => {
  const [createOrder, { loading }] = useCreateOrderMutation()

  const handleSubmit = async (
    data: CreateOrderMutationVariables,
    setErrors: Function,
    resetForm: Function
  ) => {
    try {
      const response = await createOrder({
        variables: {
          item: data.item,
          customerName: data.customerName,
          email: data.email,
          contactNum: data.contactNum
        },
        update: (store, { data }) => {
          if (!data) {
            return null
          }
          if (data.createOrder) {
            const dataStore = store.readQuery<UserQuery>({
              query: UserDocument
            })
            if (dataStore && dataStore.user && dataStore.user.orders.inbox) {
              const { todays } = dataStore.user.orders.inbox
              todays.unshift(data.createOrder)

              store.writeQuery<UserQuery>({
                query: UserDocument,
                data: dataStore
              })
            }
          }
        }
      })
      if (response && response.data) {
        resetForm()
        toast.success('Order successfully created')
        props.clearTempOrder()
        props.selectOrder(response.data.createOrder.id)
        props.setOrderView(response.data.createOrder)
      }
    } catch (error) {
      const validationErrors = formatValidationErrors(error)
      if (validationErrors) {
        toast.error('There were problem(s) creating your order.')
        setErrors(validationErrors)
      } else if (error.graphQLErrors[0].extensions.code === 'FORBIDDEN') {
        toast.error(error.graphQLErrors[0].extensions.exception.stacktrace[0])
        Router.push('/signin')
      } else {
        console.log('Error: ', 'Unexpected error. Path: ["createOrder"]')
      }
    }
  }
  return (
    <div className="viewer">
      <div className="tab-content">
        <div className="tab-pane fade show active" id="chat1" role="tabpanel">
          <div className="item">
            <div className="content">
              <div className="new-order">
                <div className="new-order-header">
                  <h5>
                    New Order
                    <ReactSVG
                      wrapper={'span'}
                      src="/static/img/svg/new-order.svg"
                    />
                  </h5>

                  <button
                    type="button"
                    className="btn round"
                    onClick={() => {
                      props.clearTempOrder()
                    }}
                  >
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
                      onSubmit={(data, { setErrors, resetForm }) =>
                        handleSubmit(data, setErrors, resetForm)
                      }
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
                          <Field
                            name="item"
                            placeholder="Items"
                            component={InputField}
                          />
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
                          <div className="new-order-footer">
                            <button className="btn primary" type="submit">
                              {loading ? (
                                <PulseLoader
                                  margin={'2px'}
                                  color={'white'}
                                  size={8}
                                />
                              ) : (
                                'Create Order'
                              )}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{viewerStyles}</style>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearTempOrder: () => dispatch(clearTempOrder()),
  selectOrder: (orderId: string) => dispatch(selectOrder(orderId)),
  setOrderView: (order: Order) => dispatch(setOrderView(order))
})

export default connect(
  null,
  mapDispatchToProps
)(NewOrderViewer)
