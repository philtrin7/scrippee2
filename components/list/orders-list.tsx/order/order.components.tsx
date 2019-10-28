import React from 'react'

import orderComponentStyles from './order.style.scss'
import StatusCounter from '../../../status-counter/status-counter.component'
import { Order } from '../../../../redux/list/list.types'

interface Props {
  order: Order
}

const OrderComponent: React.FC<Props> = (props) => {
  const { createdAt, item } = props.order
  return (
    <div>
      <ul className="nav order" role="tablist">
        <li>
          <a href="#chat1" className="filter direct active">
            <div className="status online">
              <StatusCounter createdAt={createdAt} />
            </div>
            <div className="content">
              <div className="headline">
                <h5>{item}</h5>
                <span>Today</span>
              </div>
              <p>Please review and sign the binding agreement.</p>
            </div>
          </a>
        </li>
      </ul>
      <style jsx>{orderComponentStyles}</style>
    </div>
  )
}

export default OrderComponent
