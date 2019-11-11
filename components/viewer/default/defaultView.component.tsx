import React from 'react'
import ConvoViewer from '../convo/convo.component'

import viewerStyles from '../viewer.styles.scss'

interface Props {}

export const DefaultView: React.FC<Props> = () => {
  return (
    <div className="viewer">
      <div className="tab-content">
        <div className="tab-pane fade show active" id="chat1" role="tabpanel">
          <div className="item">
            <div className="content">
              <h3>Default View</h3>
              <ConvoViewer />
            </div>
          </div>
        </div>
        <style jsx>{viewerStyles}</style>
      </div>
    </div>
  )
}
