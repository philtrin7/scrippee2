import React from 'react'

import orderComponentStyles from './order.style.scss'

interface Props {}

const OrderComponent: React.FC<Props> = () => {
  return (
    <div>
      <ul className="nav order" role="tablist">
        <li>
          <a href="#chat1" className="filter direct active">
            <div className="status online">
              <div className="status-number">1</div>
            </div>
            <div className="content">
              <div className="headline">
                <h5>Ham Chuwon</h5>
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
