import React from 'react'
import StatusCounter from '../../../status-counter/status-counter.component'

import tempOrderStyles from './temp-order.styles.scss'
import { processString } from '../../../../lib/utils/processString'

interface Props {
  orders: any
}

const TempOrder: React.FC<Props> = (props) => {
  const tempOrder = props.orders[0]
  const { customerName, item } = tempOrder

  const processedCustomerName = processString(customerName, 14, 28)
  const processedItem = processString(item, 18, 36)

  return (
    <li>
      <a href="#" className="filter direct">
        <div className="status">
          <StatusCounter daysPassed={0} />
        </div>
        <div className="content">
          <div className="headline">
            {customerName !== '' ? (
              <h5>{processedCustomerName}</h5>
            ) : (
              <h5 className="temp-placeholder">Customer name</h5>
            )}
            <span>New</span>
          </div>

          {item.length > 0 ? (
            <p>{processedItem}</p>
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
