import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { processString } from '../../../../lib/utils/processString'

import { RootState } from '../../../../redux/store'
import { OrdersListState } from '../../../../redux/ordersList/ordersList.types'
import { setNewOrderView } from '../../../../redux/viewer/viewer.actions'
import { selectNewOrder } from '../../../../redux/ordersList/ordersList.actions'

import StatusCounter from '../../../status-counter/status-counter.component'

import orderComponentStyles from '../order/order.styles.scss'

interface Props {
  selectNewOrder: Function
  setNewOrderView: Function
  ordersList: OrdersListState
}

const NewOrder: React.FC<Props> = (props) => {
  if (!props.ordersList.newOrder) {
    return <div></div>
  }
  const { customerName, item } = props.ordersList.newOrder
  const { orderId } = props.ordersList.selectOrder

  const processedCustomerName = processString(customerName, 14, 28)
  const processedItem = processString(item, 18, 36)

  const handleOnClick = () => {
    props.selectNewOrder()
    props.setNewOrderView()
  }

  return (
    <li>
      <a
        className={`filter direct ${orderId === 'NEW' ? 'active' : ''}`}
        onClick={handleOnClick}
      >
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
      <style jsx>{orderComponentStyles}</style>
    </li>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    ordersList: state.ordersList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectNewOrder: () => dispatch(selectNewOrder()),
  setNewOrderView: () => dispatch(setNewOrderView())
})

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)
