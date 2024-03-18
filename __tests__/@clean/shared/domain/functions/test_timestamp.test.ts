import {
  dateToMilliseconds,
  hoursToMilliseconds
} from '../../../../../src/app/utils/functions/timeStamp'
import '@testing-library/jest-dom'

test('Date to timestamp', () => {
  const date = '2024-03-18T18:33:54'

  const timestamp = dateToMilliseconds(date)

  expect(timestamp).toBe(1710797634000)
})

test('Milliseconds to hour', () => {
  const hours = 2

  const milliseconds = hoursToMilliseconds(hours)

  expect(milliseconds).toBe(7200000)
})
