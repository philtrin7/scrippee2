import React, { useState } from 'react'
import ReactSVG from 'react-svg'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../../../redux/store'
import { ViewerState, VIEWER_TYPES } from '../../../redux/viewer/viewer.types'
import {
  fetchArchiveListStart,
  fetchInboxListStart
} from '../../../redux/list/list.actions'

import { Order } from '../../../redux/list/list.types'
import OrderComponent from './order/order.components'

import { PulseSpinner } from '../../loading-spinner/PulseSpinner'
import ordersListStyles from './orders-list.styles.scss'
import { setNewOrderView } from '../../../redux/viewer/viewer.actions'
import StatusCounter from '../../status-counter/status-counter.component'

interface OrdersListPropTypes {
  fetchInboxListStart: Function
  fetchArchiveListStart: Function
  setNewOrderView: Function
  orders: Order[]
  loading: Boolean
  viewer: ViewerState
}

const OrdersList: React.FC<OrdersListPropTypes> = (props) => {
  const { loading, orders } = props
  const { type } = props.viewer

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
            <div className="tab-pane fade show active">
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
                <ul className="nav">
                  <li>
                    <a
                      className={`filter-btn ${currentList}`}
                      onClick={() => {
                        setArchiveList('inactive')
                        setCurrentList('active')
                        props.fetchInboxListStart()
                      }}
                    >
                      Inbox
                    </a>
                  </li>
                  <li>
                    <a
                      className={`filter-btn ${archiveList}`}
                      onClick={() => {
                        setArchiveList('active')
                        setCurrentList('inactive')
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
                  onClick={() => {
                    props.setNewOrderView()
                  }}
                >
                  <ReactSVG src="/static/img/svg/new-order.svg" />
                </button>
                <hr />
                <ul className="nav order">
                  <li>
                    {type === VIEWER_TYPES.NEW_ORDER ? (
                      <a href="#" className="filter direct active">
                        <div className="status">
                          <StatusCounter daysPassed={0} />
                        </div>
                        <div className="content">
                          <div className="headline">
                            <h5>New Order</h5>
                            <span>Now</span>
                          </div>
                          <p>Items...</p>
                        </div>
                      </a>
                    ) : (
                      ''
                    )}
                  </li>
                  {Orders}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{ordersListStyles}</style>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  viewer: state.viewer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchInboxListStart: () => dispatch(fetchInboxListStart()),
  fetchArchiveListStart: () => dispatch(fetchArchiveListStart()),
  setNewOrderView: () => dispatch(setNewOrderView())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList)
