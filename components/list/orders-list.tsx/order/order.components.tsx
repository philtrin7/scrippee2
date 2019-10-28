import React from 'react'

import SwipeLogo from '../../../../static/img/swipe-logo-replace-me.png'
import orderComponentStyles from './order.style.scss'

interface Props {}

const OrderComponent: React.FC<Props> = () => {
  return (
    <div>
      <ul className="nav order" role="tablist">
        <li>
          <a href="#chat1" className="filter direct active">
            <div className="status online">
              <img src={SwipeLogo} alt="avatar" />
              <i data-eva="radio-button-on"></i>
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
