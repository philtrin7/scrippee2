import React from "react";
import ReactSVG from "react-svg";

import commentFormStyles from "./comment-form.styles.scss";

interface Props {}

const CommentForm: React.FC<Props> = () => {
  return (
    <div className="bottom">
      <form>
        <textarea
          className="form-control"
          placeholder="Type message..."
          rows={1}
        ></textarea>
        <button type="submit" className="btn prepend">
          <ReactSVG src="/static/img/svg/send-plane.svg" />
        </button>
      </form>
      <style jsx>{commentFormStyles}</style>
    </div>
  );
};

export default CommentForm;
