import React from 'react'
import ReactSVG from 'react-svg'

import newOrderViewerStyles from './new-order.styles.scss'

interface Props {}

const NewOrderViewer: React.FC<Props> = () => {
  return (
    <div className="new-order-viewer">
      <div className="new-order-content">
        <div className="new-order-header">
          <h5>
            New Order
            <ReactSVG wrapper={'span'} src="/static/img/svg/new-order.svg" />
          </h5>

          <button type="button" className="btn round">
            <i>
              <ReactSVG src="/static/img/svg/close.svg" />
            </i>
          </button>
        </div>
        <div className="new-order-body">
          <div className="details">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="What's the topic?"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  placeholder="Hmm, are you friendly?"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="new-order-footer">
          <button type="submit" className="btn primary">
            Create Order
          </button>
        </div>
      </div>
      <style jsx>{newOrderViewerStyles}</style>
    </div>
  )
}

export default NewOrderViewer
