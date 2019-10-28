import React from 'react'
import ReactSVG from 'react-svg'

import { Order } from '../../../redux/list/list.types'
import OrderComponent from './order/order.components'

import { PulseSpinner } from '../../loading-spinner/PulseSpinner'
import ordersListStyles from './orders-list.styles.scss'

interface OrdersListPropTypes {
  orders: Order[]
  loading: Boolean
}

const OrdersList: React.FC<OrdersListPropTypes> = (props) => {
  const { loading, orders } = props

  let Orders: JSX.Element | null = null
  if (loading) {
    Orders = <PulseSpinner loading={loading} />
  } else if (orders.length > 0) {
    Orders = <OrderComponent />
  } else {
    Orders = <div>You do not have any orders yet.</div>
  }

  return (
    <div>
      <div className="orders-list">
        <div className="container">
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="conversations"
              role="tabpanel"
            >
              <div className="top">
                <form>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                  />
                  <button type="submit" className="btn prepend">
                    <ReactSVG src="/static/img/svg/search.svg" />
                  </button>
                </form>
                <ul className="nav" role="tablist">
                  <li>
                    <a
                      href="#current"
                      className="filter-btn active"
                      data-toggle="tab"
                      data-filter="direct"
                    >
                      Current
                    </a>
                  </li>
                  <li>
                    <a
                      href="#archive"
                      className="filter-btn"
                      data-toggle="tab"
                      data-filter="groups"
                    >
                      Archive
                    </a>
                  </li>
                </ul>
              </div>
              <div className="middle">
                <h4>Orders</h4>
                <button
                  type="button"
                  className="btn round"
                  data-toggle="modal"
                  data-target="#compose"
                >
                  <ReactSVG src="/static/img/svg/new-order.svg" />
                </button>
                <hr />
                {Orders}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{ordersListStyles}</style>
    </div>
  )
}

export default OrdersList
