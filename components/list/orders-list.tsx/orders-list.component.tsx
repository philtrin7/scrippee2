import React from 'react'
import ReactSVG from 'react-svg'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../../../redux/store'
import { ViewerState } from '../../../redux/viewer/viewer.types'
import { TempState } from '../../../redux/temp/temp.types'
import { LIST_TYPES, ListState, Orders } from '../../../redux/list/list.types'
import {
  fetchArchiveListStart,
  fetchInboxListStart
} from '../../../redux/list/list.actions'
import { newTempOrder } from '../../../redux/temp/temp.actions'
import {
  setNewOrderView,
  setViewerToDefault
} from '../../../redux/viewer/viewer.actions'

import TempOrder from './temp-order/temp-order.component'
import OrderComponent from './order/order.components'
import { PulseSpinner } from '../../loading-spinner/PulseSpinner'

import ordersListStyles from './orders-list.styles.scss'

interface OrdersListPropTypes {
  fetchInboxListStart: Function
  fetchArchiveListStart: Function
  setNewOrderView: Function
  newTempOrder: Function
  switchToInbox: Function
  setViewToDefault: Function
  orders: Orders
  loading: Boolean
  viewer: ViewerState
  temp: TempState
  list: ListState
}

const OrdersList: React.FC<OrdersListPropTypes> = (props) => {
  const { loading, orders } = props
  const { listType, listIsLoading } = props.list
  const { orders: tempOrders } = props.temp

  let Orders: any = null
  if (loading || listIsLoading) {
    Orders = <PulseSpinner loading={true} />
  } else if (
    orders.inbox &&
    (orders.inbox.others.length > 0 || orders.inbox.todays.length > 0)
  ) {
    const todays = orders.inbox.todays.map((order) => {
      return <OrderComponent key={order.id} order={order} />
    })
    const others = orders.inbox.others.map((order) => {
      return <OrderComponent key={order.id} order={order} />
    })

    Orders = (
      <React.Fragment>
        {todays}
        {others}
      </React.Fragment>
    )
  } else if (orders.archive && orders.archive.length > 0) {
    Orders = orders.archive.map((order) => {
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
                      className={`filter-btn ${
                        listType === LIST_TYPES.INBOX ? 'active' : ''
                      }`}
                      onClick={() => {
                        if (listType !== LIST_TYPES.INBOX) {
                          props.fetchInboxListStart()
                        }
                      }}
                    >
                      Inbox
                    </a>
                  </li>
                  <li>
                    <a
                      className={`filter-btn ${
                        listType === LIST_TYPES.ARCHIVE ? 'active' : ''
                      }`}
                      onClick={() => {
                        if (listType !== LIST_TYPES.ARCHIVE) {
                          props.fetchArchiveListStart()
                          props.setViewToDefault()
                        }
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
                    props.switchToInbox()
                    if (tempOrders.length === 0) {
                      props.newTempOrder()
                    }
                  }}
                >
                  <ReactSVG src="/static/img/svg/new-order.svg" />
                </button>
                <hr />
                <ul className="nav order">
                  {listType === LIST_TYPES.INBOX && tempOrders.length > 0 ? (
                    <TempOrder orders={tempOrders} />
                  ) : (
                    ''
                  )}

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
  viewer: state.viewer,
  temp: state.temp,
  list: state.list
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchInboxListStart: () => dispatch(fetchInboxListStart()),
  fetchArchiveListStart: () => dispatch(fetchArchiveListStart()),
  setNewOrderView: () => dispatch(setNewOrderView()),
  newTempOrder: () => dispatch(newTempOrder()),
  switchToInbox: () => dispatch(fetchInboxListStart()),
  setViewToDefault: () => dispatch(setViewerToDefault())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList)
