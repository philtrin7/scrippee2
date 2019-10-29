import React, { useState } from 'react'
import ReactSVG from 'react-svg'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { clearOrderList, fetchArchiveListStart } from '../../../redux/list/list.actions'

import { Order } from '../../../redux/list/list.types'
import OrderComponent from './order/order.components'

import { PulseSpinner } from '../../loading-spinner/PulseSpinner'
import ordersListStyles from './orders-list.styles.scss'

interface OrdersListPropTypes {
  fetchArchiveListStart: Function
  clearOrderList: Function
  orders: Order[]
  loading: Boolean
}

const OrdersList: React.FC<OrdersListPropTypes> = (props) => {
  const { loading, orders } = props

  const [currentList, setCurrentList] = useState('active')
  const [archiveList, setArchiveList] = useState('')

  let Orders: any = null
  if (loading) {
    Orders = <PulseSpinner loading={loading} />
  } else if (orders.length > 0) {
    Orders = orders.map((order) => {
      return <OrderComponent key={order.id} order={order} />
    })
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
                      className={`filter-btn ${currentList}`}
                      data-toggle="tab"
                      data-filter="direct"
                      onClick={() => {
                        setArchiveList('inactive')
                        setCurrentList('active')
                      }}
                    >
                      Current
                    </a>
                  </li>
                  <li>
                    <a
                      className={`filter-btn ${archiveList}`}
                      data-toggle="tab"
                      data-filter="groups"
                      onClick={() => {
                        setArchiveList('active')
                        setCurrentList('inactive')
                        props.clearOrderList()
                        props.fetchArchiveListStart()
                      }}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearOrderList: () => dispatch(clearOrderList()),
  fetchArchiveListStart: () => dispatch(fetchArchiveListStart())
})

export default connect(
  null,
  mapDispatchToProps
)(OrdersList)
