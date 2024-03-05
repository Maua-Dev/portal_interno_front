import { dateToMilliseconds } from '../../../../../src/app/utils/functions/timeStamp'
import '@testing-library/jest-dom'

test('Date to timestamp', () => {
  const date = '20/07/2002'

  const timestamp = dateToMilliseconds(date)

  expect(timestamp).toBe(1027123200000)
})
