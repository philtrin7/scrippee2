import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { processString } from '../../../../lib/utils/processString'

import { selectNewOrder } from '../../../../redux/selectOrder/selectOrder.actions'
import { RootState } from '../../../../redux/store'
import { TempState } from '../../../../redux/temp/temp.types'
import { SelectOrderState } from '../../../../redux/selectOrder/selectOrder.types'
import { setNewOrderView } from '../../../../redux/viewer/viewer.actions'

import StatusCounter from '../../../status-counter/status-counter.component'

import orderComponentStyles from '../order/order.styles.scss'

interface Props {
  selectNewOrder: Function
  setNewOrderView: Function
  tempOrder: TempState
  selectOrder: SelectOrderState
}

const TempOrder: React.FC<Props> = (props) => {
  const { customerName, item } = props.tempOrder.orders[0]
  const { orderId } = props.selectOrder

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

const mapStateToProps = (state: RootState) => ({
  tempOrder: state.temp,
  selectOrder: state.selectOrder
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectNewOrder: () => dispatch(selectNewOrder()),
  setNewOrderView: () => dispatch(setNewOrderView())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TempOrder)
