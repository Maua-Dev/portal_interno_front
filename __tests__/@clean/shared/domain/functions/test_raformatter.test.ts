import { plainTextToRa } from '../../../../../src/app/utils/functions/formatters'
import '@testing-library/jest-dom'

test('Plain Text to Ra', () => {
  const plainText = '21002100'

  const raFormatted = plainTextToRa(plainText)

  expect(raFormatted).toBe('21.00210-0')
})
