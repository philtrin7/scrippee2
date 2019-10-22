import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Router from 'next/router'

import { useLogoutMutation } from '../../generated/graphql'
import { signoutSuccess, signoutFail } from '../../redux/auth/auth.actions'
import { User } from '../../redux/auth/auth.types'
import { setAccessToken } from '../../lib/accessToken'

import ReactSVG from 'react-svg'
import SwipeLogo from '../../static/img/swipe-logo-replace-me.png'
import { DivContainer, ImgLogo, UlNav, LiNav } from './nav-sidebar.styles'

interface NavSideBarProps {
  signoutSuccess: Function
  signoutFailed: Function
  currentUser: User | null
}

const NavSideBar: React.FC<NavSideBarProps> = (props) => {
  const [logout, { client }] = useLogoutMutation()
  const { signoutSuccess, signoutFailed } = props

  const handleOnClick = async () => {
    try {
      await logout()
      setAccessToken('')
      await client!.resetStore()
      signoutSuccess()
    } catch (error) {
      signoutFailed()
    }

    Router.push('/signin')
  }

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
        {props.currentUser ? (
          <LiNav>
            <a onClick={handleOnClick}>
              <i className="eva-hover">
                <ReactSVG src="../../static/img/svg/signout.svg" />
              </i>
            </a>
          </LiNav>
        ) : (
          ''
        )}
      </UlNav>
    </DivContainer>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signoutSuccess: () => dispatch(signoutSuccess()),
  signoutFailed: () => dispatch(signoutFail())
})

export default connect(
  null,
  mapDispatchToProps
)(NavSideBar)
