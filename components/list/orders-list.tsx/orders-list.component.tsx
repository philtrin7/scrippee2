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
import { selectNewOrder } from '../../../redux/selectOrder/selectOrder.actions'

interface OrdersListPropTypes {
  fetchInboxListStart: Function
  fetchArchiveListStart: Function
  setNewOrderView: Function
  newTempOrder: Function
  setViewToDefault: Function
  selectNewOrder: Function
  orders: Orders
  loading: Boolean
  viewer: ViewerState
  temp: TempState
  list: ListState
}

const OrdersList: React.FC<OrdersListPropTypes> = (props) => {
  const {
    loading,
    orders: { inbox, archive }
  } = props
  const { listType, listIsLoading } = props.list
  const { orders: tempOrders } = props.temp

  const {
    fetchInboxListStart,
    fetchArchiveListStart,
    setNewOrderView,
    setViewToDefault,
    newTempOrder,
    selectNewOrder
  } = props

  let Orders: any = null
  if (loading || listIsLoading) {
    Orders = <PulseSpinner loading={true} />
  } else if (inbox && (inbox.others.length > 0 || inbox.todays.length > 0)) {
    const todays = inbox.todays.map((order) => {
      return <OrderComponent key={order.id} order={order} />
    })
    const others = inbox.others.map((order) => {
      return <OrderComponent key={order.id} order={order} />
    })

    Orders = (
      <div className="order-fragments">
        <React.Fragment>{todays}</React.Fragment>
        {inbox.todays.length > 0 || tempOrders.length > 0 ? (
          <hr className="order-divider" />
        ) : (
          ''
        )}
        <React.Fragment>{others}</React.Fragment>
      </div>
    )
  } else if (archive && archive.length > 0) {
    Orders = archive.map((order) => {
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
                          fetchArchiveListStart()
                          setViewToDefault()
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
                    if (listType !== LIST_TYPES.INBOX) {
                      fetchInboxListStart()
                    }
                    if (tempOrders.length === 0) {
                      newTempOrder()
                    }
                    setNewOrderView()
                    selectNewOrder()
                  }}
                >
                  <ReactSVG src="/static/img/svg/new-order.svg" />
                </button>
                <hr />
                <ul className="nav order">
                  {listType === LIST_TYPES.INBOX && tempOrders.length > 0 ? (
                    <TempOrder />
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
  setViewToDefault: () => dispatch(setViewerToDefault()),
  selectNewOrder: () => dispatch(selectNewOrder())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList)
