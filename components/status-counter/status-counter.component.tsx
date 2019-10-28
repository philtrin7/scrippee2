import React from 'react'

import statusCounterStyles from './status-counter.styles.scss'

interface Props {
  daysPassed: number | null
}

const StatusCounter: React.FC<Props> = (props) => {
  const { daysPassed } = props

  let counter: number | string = '-'
  let status: string = ''
  let star = ''

  if (daysPassed !== null) {
    if (daysPassed > 0) {
      if (daysPassed <= 3) {
        // Days 1, 2, 3 = green
        status = 'safe'
      } else if (daysPassed >= 4 && daysPassed <= 7) {
        // Days 4, 5, 6, 7
        status = 'warn'
      } else {
        // Days >= 8
        status = 'danger'
      }
      counter = daysPassed
    } else {
      // Day 0
      status = 'safe'
      star = 'star'
      counter = '*'
    }
  } else {
    // Should never reach to this logic
    // Default initial value if it does
  }

  return (
    <div>
      <div className={`status-counter ${star} ${status}`}>{counter}</div>
      <style jsx>{statusCounterStyles}</style>
    </div>
  )
}

export default StatusCounter
