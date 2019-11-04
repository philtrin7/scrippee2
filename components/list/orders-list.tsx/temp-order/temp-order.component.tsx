import React from 'react'
import StatusCounter from '../../../status-counter/status-counter.component'

import tempOrderStyles from './temp-order.styles.scss'

interface Props {
  orders: any
}

const TempOrder: React.FC<Props> = (props) => {
  const tempOrders = props.orders[0]

  return (
    <li>
      <a href="#" className="filter direct active">
        <div className="status">
          <StatusCounter daysPassed={0} />
        </div>
        <div className="content">
          <div className="headline">
            {tempOrders.customerName !== '' ? (
              <h5>{tempOrders.customerName}</h5>
            ) : (
              <h5 className="temp-placeholder">Customer name</h5>
            )}
            <span>New</span>
          </div>

          {tempOrders.item.length > 0 ? (
            <p>{tempOrders.item}</p>
          ) : (
            <p className="temp-placeholder">Items...</p>
          )}
        </div>
      </a>
      <style jsx>{tempOrderStyles}</style>
    </li>
  )
}

export default TempOrder
