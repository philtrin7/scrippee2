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
import { PulseSpinner } from '../../loading-spinner/PulseSpinner'

import ordersListStyles from './orders-list.styles.scss'
import TempOrder from './temp-order/temp-order.component'

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
  const { listType } = props.list
  const { orders: tempOrders } = props.temp

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
  newTempOrder: () => dispatch(newTempOrder())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList)
