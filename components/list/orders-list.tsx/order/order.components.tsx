import React from 'react'
import dayjs from 'dayjs'
import { daysBetween } from '../../../../lib/utils/daysBetweenCalc'

import { Order } from '../../../../redux/list/list.types'
import StatusCounter from '../../../status-counter/status-counter.component'

import orderComponentStyles from './order.style.scss'

interface Props {
  order: Order
}

const OrderComponent: React.FC<Props> = (props) => {
  const { createdAt, item, customerName } = props.order

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

  return (
    <li>
      <a href="#" className="filter direct active">
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

export default OrderComponent
