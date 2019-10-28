import React from 'react'
import dayjs from 'dayjs'

import statusCounterStyles from './status-counter.styles.scss'

interface Props {
  createdAt: string
}

const daysBetween = (orderDate: string): number => {
  // Set date to 9am tomorrow
  const fromDate = dayjs()
    .hour(9)
    .minute(0)
    .second(0)
    .add(1, 'day')
  return fromDate.diff(orderDate, 'day')
}

const StatusCounter: React.FC<Props> = (props) => {
  const { createdAt } = props

  let counter: number | string = '-'
  let status: string = ''
  let star = ''
  const numOfDaysPassed = daysBetween(createdAt)

  if (typeof numOfDaysPassed === 'number') {
    if (numOfDaysPassed > 0) {
      if (numOfDaysPassed <= 3) {
        // Days 1, 2, 3 = green
        status = 'safe'
      } else if (numOfDaysPassed >= 4 && numOfDaysPassed <= 7) {
        // Days 4, 5, 6, 7
        status = 'warn'
      } else {
        // Days >= 8
        status = 'danger'
      }
      counter = numOfDaysPassed
    } else if (numOfDaysPassed < 0) {
      // Should not be negative; default to initial values
    } else {
      // Number of days === 0
      status = 'safe'
      star = 'star'
      counter = '*'
    }
  } else {
    // Something went wrong; default to initial values
  }

  return (
    <div>
      <div className={`status-counter ${star} ${status}`}>{counter}</div>
      <style jsx>{statusCounterStyles}</style>
    </div>
  )
}

export default StatusCounter
