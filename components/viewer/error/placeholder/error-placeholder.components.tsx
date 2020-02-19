import React from 'react'

import errorPlaceholderStyles from './error-placeholder.styles.scss'

interface Props {}

// Inspiration taken from https://codepen.io/jkantner/pen/aPLWJm
export const ErrorPlaceholder: React.FC<Props> = () => {
  return (
    <div className="error-placeholder">
      <div className="sad-mac"></div>
      <style jsx>{errorPlaceholderStyles}</style>
    </div>
  )
}
