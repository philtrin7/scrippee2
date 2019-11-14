import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { useCommentsLazyQuery } from '../../../generated/graphql'
import { fetchComments } from '../../../redux/viewer/viewer.actions'
import { Comments, OrderConvo } from '../../../redux/viewer/viewer.types'
import { RootState } from '../../../redux/store'

import CommentForm from '../comment-form/comment-form.component'

import convoViewerStyles from './convo.styles.scss'

interface Props {
  fetchComments: Function
  convo: OrderConvo
  comments: Comments | undefined
}

const ConvoViewer: React.FC<Props> = (props) => {
  const { fetchComments, comments } = props
  const [getComments, { data: commentsData }] = useCommentsLazyQuery({
    variables: { convoId: props.convo.id }
  })

  useEffect(() => {
    getComments()
    if (commentsData && commentsData.comments) {
      const { comments } = commentsData
      fetchComments(comments)
    }
  }, [commentsData])

  let Comment: any = null
  if (comments) {
    Comment = comments.map((comment) => {
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
        <CommentForm convoId={props.convo.id} />
      </div>
      <style jsx>{convoViewerStyles}</style>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    comments: state.viewer.comments
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchComments: (comments: Comments) => dispatch(fetchComments(comments))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConvoViewer)
