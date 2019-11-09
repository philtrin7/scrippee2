import React from 'react'
import { connect } from 'react-redux'

import { RootState } from '../../redux/store'
import { ViewerState, VIEWER_TYPES } from '../../redux/viewer/viewer.types'

import HeaderViewer from './header/header.component'
import ConvoViewer from './convo/convo.component'
import NewOrderViewer from './new-order/new-order.component'

import viewerStyles from './viewer.styles.scss'

interface Props {
  viewer: ViewerState
}

const Viewer: React.FC<Props> = (props) => {
  const { order } = props.viewer

  let Viewer: any = props.viewer.type
  if (!Viewer) {
    Viewer = (
      <div>
        <h3>Viewer Undefined</h3>
        <ConvoViewer />
      </div>
    )
  } else if (Viewer === VIEWER_TYPES.ORDER && order) {
    Viewer = (
      <div>
        <HeaderViewer order={order} />
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

export default connect(mapStateToProps)(Viewer)
