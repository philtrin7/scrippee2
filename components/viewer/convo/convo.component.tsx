import React from 'react'

import { Convo } from '../../../generated/graphql'
import CommentForm from '../comment-form/comment-form.component'

import convoViewerStyles from './convo.styles.scss'

interface Props {
  convo: Pick<Convo, 'id' | 'updatedAt' | 'createdAt'>
}

const ConvoViewer: React.FC<Props> = (props) => {
  return (
    <div>
      <div className="middle">
        <div className="container">
          <ul>
            <li>
              <div className="content">
                <div className="message">
                  <div className="bubble">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
                <span>07:30am</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="container comment-form">
        <CommentForm convoId={props.convo.id} />
      </div>
      <style jsx>{convoViewerStyles}</style>
    </div>
  )
}

export default ConvoViewer
