import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { useConvoLazyQuery } from '../../generated/graphql'
import { RootState } from '../../redux/store'
import {
  ViewerState,
  VIEWER_TYPES,
  OrderConvo
} from '../../redux/viewer/viewer.types'
import { fetchConvo } from '../../redux/viewer/viewer.actions'
import { Dispatch } from 'redux'

import HeaderViewer from './header/header.component'
import ConvoViewer from './convo/convo.component'
import NewOrderViewer from './new-order/new-order.component'
import { DefaultView } from './default/defaultView.component'
import { PulseSpinner } from '../loading-spinner/PulseSpinner'
import { ErrorPlaceholder } from './error/placeholder/error-placeholder.components'

import viewerStyles from './viewer.styles.scss'

interface Props {
  fetchConvo: Function
  viewer: ViewerState
}

const Viewer: React.FC<Props> = (props) => {
  const { order } = props.viewer
  let Viewer: any = props.viewer.type

  if (Viewer === VIEWER_TYPES.NEW_ORDER) {
    return <NewOrderViewer />
  }

  if (!order) {
    return <DefaultView />
  }

  const [
    getConvo,
    { data: convoData, loading: loadingConvo }
  ] = useConvoLazyQuery({
    variables: { orderId: order.id }
  })

  useEffect(() => {
    getConvo()
    if (convoData) {
      props.fetchConvo(convoData.convo)
    }
  }, [convoData])

  if (Viewer === VIEWER_TYPES.ORDER) {
    Viewer = (
      <div>
        <HeaderViewer order={order} />

        {loadingConvo || !convoData ? (
          <div className="row text-center">
            <PulseSpinner loading={loadingConvo} />
          </div>
        ) : (
          <ConvoViewer convo={convoData.convo} order={order} />
        )}
      </div>
    )
  } else {
    Viewer = <ErrorPlaceholder />
  }

  return (
    <div className="viewer">
      <div className="tab-content">
        <div className="tab-pane fade show active" id="chat1" role="tabpanel">
          <div className="item">
            <div className="content">{Viewer}</div>
          </div>
        </div>
      </div>
      <style jsx>{viewerStyles}</style>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    viewer: state.viewer
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConvo: (convo: OrderConvo) => dispatch(fetchConvo(convo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
