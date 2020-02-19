import React from 'react'
import ReactSVG from 'react-svg'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Formik, Form, Field } from 'formik'

import { setOrderView } from '../../../redux/viewer/viewer.actions'
import {
  clearNewOrder,
  selectOrder
} from '../../../redux/ordersList/ordersList.actions'
import {
  useCreateCommentMutation,
  CreateCommentMutationVariables,
  MutationCreateCommentArgs,
  ConvoQuery,
  ConvoDocument,
  Order
} from '../../../generated/graphql'
import ClipLoader from 'react-spinners/ClipLoader'
import InputFieldComment from './fields/inputFieldComment.component'

import commentFormStyles from './comment-form.styles.scss'

type CommentForm = MutationCreateCommentArgs

interface Props {
  clearNewOrder: Function
  setOrderView: Function
  selectOrder: Function
  convoId: string
  order: Order
}

const CommentForm: React.FC<Props> = (props) => {
  const [createComment, { loading }] = useCreateCommentMutation()

  const handleSubmit = async (
    formData: CreateCommentMutationVariables,
    resetForm: Function
  ) => {
    try {
      const response = await createComment({
        variables: {
          convoId: props.convoId,
          text: formData.text
        },
        update: (store, { data }) => {
          if (!data) {
            return null
          }
          if (data.createComment) {
            const dataStore = store.readQuery<ConvoQuery>({
              query: ConvoDocument,
              variables: { orderId: props.order.id }
            })

            if (dataStore && dataStore.convo && dataStore.convo.comments) {
              const { comments } = dataStore.convo
              comments.push(data.createComment)

              store.writeQuery<ConvoQuery>({
                query: ConvoDocument,
                variables: { orderId: props.order.id },
                data: {
                  convo: dataStore.convo
                }
              })
            }
          }
        }
      })
      if (response && response.data) {
        resetForm()
        props.setOrderView(props.order)
      }
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
        onSubmit={(data, { resetForm }) => handleSubmit(data, resetForm)}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearNewOrder: () => dispatch(clearNewOrder()),
  selectOrder: (orderId: string) => dispatch(selectOrder(orderId)),
  setOrderView: (order: Order) => dispatch(setOrderView(order))
})

export default connect(null, mapDispatchToProps)(CommentForm)
