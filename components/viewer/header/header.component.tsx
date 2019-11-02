import React from 'react'
import ReactSVG from 'react-svg'

import SwipeLogo from '../../../static/img/swipe-logo-replace-me.png'

import headerViewerStyles from './header.styles.scss'

interface Props {}

const HeaderViewer: React.FC<Props> = () => {
  return (
    <div className="container">
      <div className="top">
        <div className="headline">
          <img src={SwipeLogo} alt="avatar" />
          <div className="content">
            <h5>Quincy Hensen</h5>
            <span>Away</span>
          </div>
        </div>
        <ul>
          <li>
            <button type="button" className="btn">
              <i className="eva-hover">
                <ReactSVG src="/static/img/svg/video.svg" />
              </i>
            </button>
          </li>
          <li>
            <button type="button" className="btn">
              <i className="eva-hover">
                <ReactSVG src="/static/img/svg/phone.svg" />
              </i>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn"
              data-toggle="modal"
              data-target="#compose"
            >
              <i className="eva-hover">
                <ReactSVG src="/static/img/svg/add-friend.svg" />
              </i>
            </button>
          </li>
          <li>
            <button type="button" className="btn" data-utility="open">
              <i className="eva-hover">
                <ReactSVG src="/static/img/svg/info.svg" />
              </i>
            </button>
          </li>
        </ul>
      </div>
      <style jsx>{headerViewerStyles}</style>
    </div>
  )
}

export default HeaderViewer
