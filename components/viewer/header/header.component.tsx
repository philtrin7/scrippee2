import React from 'react'
import ReactSVG from 'react-svg'
import dayjs from 'dayjs'
import { daysBetween } from '../../../lib/utils/daysBetweenCalc'

import { Order } from '../../../generated/graphql'
import StatusCounter from '../../status-counter/status-counter.component'

import headerViewerStyles from './header.styles.scss'

interface Props {
  order: Order
}

const HeaderViewer: React.FC<Props> = (props) => {
  const { customerName, updatedAt } = props.order

  let LastUpdated: any = ''
  const days = daysBetween(updatedAt)
  const updatedAtTime = dayjs(updatedAt).format('h:mm a')

  if (typeof days === 'number') {
    if (days === 0) {
      LastUpdated = `Last updated today at ${updatedAtTime}`
    } else if (days === 1) {
      LastUpdated = `Last updated yesterday at ${updatedAtTime}`
    } else if (days > 1 && days <= 5) {
      const updatedAtDay = dayjs(updatedAt).format('dddd D MMM')
      LastUpdated = `Last updated on ${updatedAtDay}`
    } else {
      const updatedAtDate = dayjs(updatedAt).format('D/MM/YY')
      LastUpdated = `Last updated on ${updatedAtDate}`
    }
  } else {
    // Must be a number
    LastUpdated = ''
  }
  return (
    <div className="container">
      <div className="top">
        <div className="headline">
          <div className="status">
            <StatusCounter daysPassed={days} />
          </div>
          <div className="content">
            <h5>{customerName}</h5>
            <span>{LastUpdated}</span>
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
