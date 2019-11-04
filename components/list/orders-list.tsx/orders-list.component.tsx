import React, { useState } from 'react'
import ReactSVG from 'react-svg'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../../../redux/store'
import { ViewerState } from '../../../redux/viewer/viewer.types'
import { TempState } from '../../../redux/temp/temp.types'
import { Order, ListState, LIST_TYPES } from '../../../redux/list/list.types'
import {
  fetchArchiveListStart,
  fetchInboxListStart
} from '../../../redux/list/list.actions'
import { newTempOrder } from '../../../redux/temp/temp.actions'
import { setNewOrderView } from '../../../redux/viewer/viewer.actions'

import OrderComponent from './order/order.components'
import StatusCounter from '../../status-counter/status-counter.component'
import { PulseSpinner } from '../../loading-spinner/PulseSpinner'

import ordersListStyles from './orders-list.styles.scss'

interface OrdersListPropTypes {
  fetchInboxListStart: Function
  fetchArchiveListStart: Function
  setNewOrderView: Function
  newTempOrder: Function
  orders: Order[]
  loading: Boolean
  viewer: ViewerState
  temp: TempState
  list: ListState
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
                    props.newTempOrder()
                  }}
                >
                  <ReactSVG src="/static/img/svg/new-order.svg" />
                </button>
                <hr />
                <ul className="nav order">
                  <li>
                    {props.list.listType === LIST_TYPES.INBOX &&
                    props.temp.orders.length > 0 ? (
                      <a href="#" className="filter direct active">
                        <div className="status">
                          <StatusCounter daysPassed={0} />
                        </div>
                        <div className="content">
                          <div className="headline">
                            {props.temp.orders[0].customerName !== '' ? (
                              <h5>{props.temp.orders[0].customerName}</h5>
                            ) : (
                              <h5 className="temp-placeholder">
                                Customer name
                              </h5>
                            )}
                            <span>New</span>
                          </div>

                          {props.temp.orders[0].item.length > 0 ? (
                            <p>{props.temp.orders[0].item}</p>
                          ) : (
                            <p className="temp-placeholder">Items...</p>
                          )}
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
  viewer: state.viewer,
  temp: state.temp,
  list: state.list
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchInboxListStart: () => dispatch(fetchInboxListStart()),
  fetchArchiveListStart: () => dispatch(fetchArchiveListStart()),
  setNewOrderView: () => dispatch(setNewOrderView()),
  newTempOrder: () => dispatch(newTempOrder())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList)
