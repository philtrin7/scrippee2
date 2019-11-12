import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { selectOrder } from '../../../../redux/selectOrder/selectOrder.actions'
import { RootState } from '../../../../redux/store'
import { SelectOrderState } from '../../../../redux/selectOrder/selectOrder.types'
import { setOrderView } from '../../../../redux/viewer/viewer.actions'

import { Order } from '../../../../generated/graphql'
import { daysBetween } from '../../../../lib/utils/daysBetweenCalc'
import StatusCounter from '../../../status-counter/status-counter.component'

import orderComponentStyles from './order.styles.scss'
import { processString } from '../../../../lib/utils/processString'

interface Props {
  selectOrder: Function
  setOrderView: Function
  order: Order
  selectedOrder: SelectOrderState
}

const OrderComponent: React.FC<Props> = (props) => {
  const { id, createdAt, item, customerName } = props.order
  const { selectOrder, selectedOrder, order } = props
  const { setOrderView } = props

  const processedItem = processString(item, 18, 36)
  const processedCustomerName = processString(customerName, 14, 28)

  let days: number | null
  let userfriendlyDate: string = '-'
  days = daysBetween(createdAt)

  if (typeof days === 'number') {
    if (days === 0) {
      userfriendlyDate = 'Today'
    } else if (days === 1) {
      userfriendlyDate = 'Yesterday'
    } else if (days >= 2 && days <= 3) {
      userfriendlyDate = dayjs(createdAt).format('dddd')
    } else if (days >= 4) {
      userfriendlyDate = dayjs(createdAt).format('DD/MM/YYYY')
    } else {
      // Should never be negative
      days = null
    }
  } else {
    // Must be a number
    days = null
  }

  const isActive = () => {
    if (selectedOrder.orderId === id) {
      return true
    } else {
      return false
    }
  }

  const handleOnClick = () => {
    selectOrder(id)
    setOrderView(order)
  }

  return (
    <li>
      <a
        href="#"
        className={`filter direct ${isActive() ? 'active' : ''}`}
        onClick={handleOnClick}
      >
        <div className="status">
          <StatusCounter daysPassed={days} />
        </div>
        <div className="content">
          <div className="headline">
            <h5>{processedCustomerName}</h5>
            <span>{userfriendlyDate}</span>
          </div>
          <p>{processedItem}</p>
        </div>
      </a>
      <style jsx>{orderComponentStyles}</style>
    </li>
  )
}

const mapStateToProps = (state: RootState) => ({
  selectedOrder: state.selectOrder
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOrder: (orderId: string) => dispatch(selectOrder(orderId)),
  setOrderView: (order: Order) => dispatch(setOrderView(order))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderComponent)
