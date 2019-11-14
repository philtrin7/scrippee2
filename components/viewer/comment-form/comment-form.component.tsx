import React from 'react'
import ReactSVG from 'react-svg'

import { Formik, Form, Field } from 'formik'
import {
  useCreateCommentMutation,
  CreateCommentMutationVariables,
  MutationCreateCommentArgs
} from '../../../generated/graphql'
import ClipLoader from 'react-spinners/ClipLoader'
import InputFieldComment from './fields/inputFieldComment.component'

import commentFormStyles from './comment-form.styles.scss'

type CommentForm = MutationCreateCommentArgs

interface Props {
  convoId: string
}

const CommentForm: React.FC<Props> = (props) => {
  const [createComment, { loading }] = useCreateCommentMutation()

  const handleSubmit = async (data: CreateCommentMutationVariables) => {
    try {
      const response = await createComment({
        variables: {
          convoId: props.convoId,
          text: data.text
        }
      })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bottom">
      <Formik<CommentForm>
        initialValues={{
          convoId: props.convoId,
          text: ''
        }}
        onSubmit={(data) => handleSubmit(data)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {() => (
          <Form>
            <Field
              className="form-control"
              name="text"
              placeholder="Add a comment"
              component={InputFieldComment}
            />
            <button type="submit" className="btn prepend">
              {loading ? (
                <ClipLoader color={'#bdbac2'} size={21} />
              ) : (
                <ReactSVG src="/static/img/svg/send-plane.svg" />
              )}
            </button>
          </Form>
        )}
      </Formik>

      <style jsx>{commentFormStyles}</style>
    </div>
  )
}

export default CommentForm
