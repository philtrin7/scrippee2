import React from 'react'
import { connect } from 'react-redux'
import StatusCounter from '../../../status-counter/status-counter.component'

import tempOrderStyles from './temp-order.styles.scss'
import { processString } from '../../../../lib/utils/processString'
import { RootState } from '../../../../redux/store'
import { SelectOrderState } from '../../../../redux/selectOrder/selectOrder.types'
import { Dispatch } from 'redux'
import { selectNewOrder } from '../../../../redux/selectOrder/selectOrder.actions'
import { setNewOrderView } from '../../../../redux/viewer/viewer.actions'

interface Props {
  selectNewOrder: Function
  setNewOrderView: Function
  selectedOrder: SelectOrderState
  orders: any
}

const TempOrder: React.FC<Props> = (props) => {
  const tempOrder = props.orders[0]
  const { customerName, item } = tempOrder
  const { selectedOrder, selectNewOrder, setNewOrderView } = props

  const processedCustomerName = processString(customerName, 14, 28)
  const processedItem = processString(item, 18, 36)

  const handleOnClick = () => {
    selectNewOrder() && setNewOrderView()
  }

  return (
    <li>
      <a
        href="#"
        className={`filter direct ${
          selectedOrder.orderId === 'NEW' ? 'active' : ''
        }`}
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
      <style jsx>{tempOrderStyles}</style>
    </li>
  )
}

const mapStateToProps = (state: RootState) => ({
  selectedOrder: state.selectOrder
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectNewOrder: () => dispatch(selectNewOrder()),
  setNewOrderView: () => dispatch(setNewOrderView())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TempOrder)
