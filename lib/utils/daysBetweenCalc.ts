import dayjs from 'dayjs'

export const daysBetween = (orderDate: string): number => {
  // Set date to 6am tomorrow
  const fromDate = dayjs()
    .hour(6)
    .minute(0)
    .second(0)
    .add(1, 'day')
  return fromDate.diff(orderDate, 'day')
}
