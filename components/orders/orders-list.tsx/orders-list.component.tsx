import React from 'react'
import ReactSVG from 'react-svg'

// import { ReactComponent as SearchSVGIcon } from '../../../assets/search.svg'
// import { ReactComponent as NewOrderSVGIcon } from '../../../assets/new-order.svg'

import ordersListStyles from './orders-list.styles.scss'

const OrdersList = () => {
  return (
    <div>
      <div className="orders-list">
        <div className="container">
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="conversations"
              role="tabpanel"
            >
              <div className="top">
                <form>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                  />
                  <button type="submit" className="btn prepend">
                    <ReactSVG src="/static/img/svg/search.svg" />
                  </button>
                </form>
                <ul className="nav" role="tablist">
                  <li>
                    <a
                      href="#current"
                      className="filter-btn active"
                      data-toggle="tab"
                      data-filter="direct"
                    >
                      Current
                    </a>
                  </li>
                  <li>
                    <a
                      href="#archive"
                      className="filter-btn"
                      data-toggle="tab"
                      data-filter="groups"
                    >
                      Archive
                    </a>
                  </li>
                </ul>
              </div>
              <div className="middle">
                <h4>Orders</h4>
                <button
                  type="button"
                  className="btn round"
                  data-toggle="modal"
                  data-target="#compose"
                >
                  <ReactSVG src="/static/img/svg/new-order.svg" />
                </button>
                <hr />

                {/* <Order /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{ordersListStyles}</style>
    </div>
  )
}

export default OrdersList
