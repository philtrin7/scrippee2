import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Convo, useGetConvoLazyQuery } from '../../generated/graphql'
import { RootState } from '../../redux/store'
import { ViewerState, VIEWER_TYPES } from '../../redux/viewer/viewer.types'
import { fetchConvo } from '../../redux/viewer/viewer.actions'
import { Dispatch } from 'redux'

import HeaderViewer from './header/header.component'
import ConvoViewer from './convo/convo.component'
import NewOrderViewer from './new-order/new-order.component'
import { DefaultView } from './default/defaultView.component'
import { PulseSpinner } from '../loading-spinner/PulseSpinner'

import viewerStyles from './viewer.styles.scss'

interface Props {
  fetchConvo: Function
  viewer: ViewerState
}

const Viewer: React.FC<Props> = (props) => {
  const { order } = props.viewer
  let Viewer: any = props.viewer.type

  if (!order || !Viewer) {
    return <DefaultView />
  }

  const [
    getConvo,
    { data: convoData, loading: loadingConvo }
  ] = useGetConvoLazyQuery({
    variables: { orderId: order.id }
  })

  useEffect(() => {
    getConvo()
    if (convoData) {
      props.fetchConvo(convoData.getConvo)
    }
  }, [convoData])

  if (Viewer === VIEWER_TYPES.ORDER) {
    Viewer = (
      <div>
        <HeaderViewer order={order} />

        {loadingConvo ? (
          <div className="row text-center">
            <PulseSpinner loading={loadingConvo} />
          </div>
        ) : (
          <ConvoViewer />
        )}
      </div>
    )
  } else if (Viewer === VIEWER_TYPES.NEW_ORDER) {
    Viewer = (
      <div>
        <NewOrderViewer />
      </div>
    )
  } else {
    Viewer = <div>Hmmm... this shouldn't have happened</div>
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
  fetchConvo: (convo: Pick<Convo, 'id' | 'updatedAt' | 'createdAt'>) =>
    dispatch(fetchConvo(convo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)
