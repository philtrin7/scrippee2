import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { Order } from '../../../../redux/list/list.types'
import { daysBetween } from '../../../../lib/utils/daysBetweenCalc'
import StatusCounter from '../../../status-counter/status-counter.component'

import orderComponentStyles from './order.style.scss'
import { selectOrder } from '../../../../redux/selectOrder/selectOrder.actions'
import { RootState } from '../../../../redux/store'
import { SelectOrderState } from '../../../../redux/selectOrder/selectOrder.types'

interface Props {
  selectOrder: Function
  order: Order
  selectedOrder: SelectOrderState
}

const OrderComponent: React.FC<Props> = (props) => {
  const { id, createdAt, item, customerName } = props.order
  const { selectedOrder } = props

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

  console.log(isActive)

  const handleOnClick = () => {
    props.selectOrder(id)
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
            <h5>{customerName}</h5>
            <span>{userfriendlyDate}</span>
          </div>
          <p>{item}</p>
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
  selectOrder: (orderId: string) => dispatch(selectOrder(orderId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderComponent)
