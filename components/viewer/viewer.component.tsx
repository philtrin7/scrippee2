import React from 'react'

import HeaderViewer from './header/header.component'

import viewerStyles from './viewer.styles.scss'
import ConvoViewer from './convo/convo.component'

interface Props {}

const Viewer: React.FC<Props> = () => {
  return (
    <div className="viewer">
      <div className="tab-content">
        <div className="tab-pane fade show active" id="chat1" role="tabpanel">
          <div className="item">
            <div className="content">
              <HeaderViewer />
              <ConvoViewer />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{viewerStyles}</style>
    </div>
  )
}

export default Viewer
