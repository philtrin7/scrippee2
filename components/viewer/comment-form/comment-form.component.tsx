import React from "react";
import ReactSVG from "react-svg";

import { Formik, Form, Field } from "formik";
import { Comment } from "../../../generated/graphql";
import ClipLoader from "react-spinners/ClipLoader";

import commentFormStyles from "./comment-form.styles.scss";

type CommentForm = Pick<Comment, "text">;

interface Props {}

const CommentForm: React.FC<Props> = () => {
  const handleSubmit = () => {};

  return (
    <div className="bottom">
      <Formik<CommentForm>
        initialValues={{
          text: ""
        }}
        onSubmit={_data => handleSubmit()}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {() => (
          <Form className="test">
            <Field
              className="form-control"
              name="text"
              placeholder="Add a comment"
            />
            <button type="submit" className="btn prepend">
              <ClipLoader color={"#bdbac2"} size={21} />
              <ReactSVG src="/static/img/svg/send-plane.svg" />
            </button>
          </Form>
        )}
      </Formik>

      <style jsx>{commentFormStyles}</style>
    </div>
  );
};

export default CommentForm;
