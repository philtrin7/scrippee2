import styled from 'styled-components'

export const DivContainer = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`
export const ImgLogo = styled.img`
  width: 50px;
  height: 50px;
`

export const UlNav = styled.ul`
  padding-left: 0;
  list-style: none;
  margin-bottom: 0;
`

export const LiNav = styled.li`
  > a {
    .eva {
      width: 36px;
      height: 36px;
      fill: #bdbac2;
      -moz-transition: all 0.3s;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
    &:hover {
      .eva {
        fill: #007bff;
      }
    }
  }
  > a.active {
    .eva {
      fill: #007bff;
    }
  }
`
export const Btn = styled.button`
  padding: 0;
  position: relative;
`

export const ImgAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 100%;
`
