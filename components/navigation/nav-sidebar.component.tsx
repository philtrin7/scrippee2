import React from 'react'

import ReactSVG from 'react-svg'
import avatar from '../../static/img/avatar-male-1.jpg'
import SwipeLogo from '../../static/img/swipe-logo-replace-me.png'

import {
  DivContainer,
  ImgLogo,
  UlNav,
  LiNav,
  Btn,
  ImgAvatar
} from './nav-sidebar.styles'

const NavSideBar: React.FC = () => {
  return (
    <DivContainer className="container">
      <a href="/" className="logo" rel="home">
        <ImgLogo src={SwipeLogo} alt="logo" />
      </a>
      <UlNav role="tablist">
        <LiNav>
          <a
            href="/"
            className="active"
            data-toggle="tab"
            role="tab"
            aria-controls="conversations"
            aria-selected="true"
          >
            <i className="eva-hover">
              <ReactSVG src="../../static/img/svg/eva-message-square.svg" />
            </i>
          </a>
        </LiNav>
        <LiNav>
          <a
            href="/"
            data-toggle="tab"
            role="tab"
            aria-controls="settings"
            aria-selected="false"
          >
            <i className="eva-hover">
              <ReactSVG src="../../static/img/svg/settings-icon.svg" />
            </i>
          </a>
        </LiNav>
        <li>
          <Btn type="button" className="btn">
            <ImgAvatar src={avatar} alt="avatar" />
          </Btn>
        </li>
      </UlNav>
    </DivContainer>
  )
}

export default NavSideBar
