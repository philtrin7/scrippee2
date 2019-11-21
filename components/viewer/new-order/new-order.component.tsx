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
  CurrentUserQuery,
  CurrentUserDocument,
  Order
} from '../../../generated/graphql'

import { setOrderView } from '../../../redux/viewer/viewer.actions'
import {
  clearNewOrder,
  selectOrder
} from '../../../redux/ordersList/ordersList.actions'

import viewerStyles from '../viewer.styles.scss'

type OrderForm = Pick<
  Order,
  'customerName' | 'item' | 'contactNum' | 'email' | 'deposit' | 'quote'
>

interface Props {
  clearNewOrder: Function
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
          contactNum: data.contactNum,
          quote: data.quote,
          deposit: data.deposit
        },
        update: (store, { data }) => {
          if (!data) {
            return null
          }
          if (data.createOrder) {
            const dataStore = store.readQuery<CurrentUserQuery>({
              query: CurrentUserDocument
            })
            if (
              dataStore &&
              dataStore.currentUser &&
              dataStore.currentUser.orders.inbox
            ) {
              const { todays } = dataStore.currentUser.orders.inbox
              todays.unshift(data.createOrder)

              store.writeQuery<CurrentUserQuery>({
                query: CurrentUserDocument,
                data: dataStore
              })
            }
          }
        }
      })
      if (response && response.data) {
        resetForm()
        toast.success('Order successfully created')
        props.clearNewOrder()
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
                      props.clearNewOrder()
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
                        email: '',
                        quote: '',
                        deposit: ''
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
                          <div className="input-inline">
                            <div className="input-left">
                              <Field
                                name="quote"
                                placeholder="Quote (optional)"
                                component={InputField}
                              />
                            </div>
                            <div className="input-right">
                              <Field
                                name="deposit"
                                placeholder="Deposit (optional)"
                                component={InputField}
                              />
                            </div>
                          </div>
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
  clearNewOrder: () => dispatch(clearNewOrder()),
  selectOrder: (orderId: string) => dispatch(selectOrder(orderId)),
  setOrderView: (order: Order) => dispatch(setOrderView(order))
})

export default connect(null, mapDispatchToProps)(NewOrderViewer)
