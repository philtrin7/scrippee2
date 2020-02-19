import React from 'react'

import CommentForm from '../comment-form/comment-form.component'

import convoViewerStyles from './convo.styles.scss'
import { OrderConvo } from '../../../redux/viewer/viewer.types'
import { Order } from '../../../generated/graphql'

interface Props {
  convo: OrderConvo
  order: Order
}

const ConvoViewer: React.FC<Props> = (props) => {
  const { convo, order } = props

  let Comment: any = <p></p>
  if (convo.comments) {
    Comment = convo.comments.map((comment) => {
      return <p key={comment.id}>{comment.text}</p>
    })
  }

  return (
    <div>
      <div className="middle">
        <div className="container">
          <ul>
            <li>
              <div className="content">
                <div className="message">
                  <div className="bubble">{Comment}</div>
                </div>
                <span>07:30am</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="container comment-form">
        <CommentForm convoId={convo.id} order={order} />
      </div>
      <style jsx>{convoViewerStyles}</style>
    </div>
  )
}

export default ConvoViewer
