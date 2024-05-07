import { uuid } from 'uuidv4'
import { AssociatedAction } from '../../../../../src/@clean/shared/domain/entities/associated_action'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import { test, expect } from 'vitest'

// Instance Test

test('Test Associated Action entity', () => {
  const associatedAction = new AssociatedAction({
    userId: '0693b74b-5cb0-406b-851b-b58075cfb346',
    startDate: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763'
  })

  expect(associatedAction).toBeInstanceOf(AssociatedAction)
})

// Properties Tests

test('Test Associated Action entity userId', () => {
  const associatedAction = new AssociatedAction({
    userId: '0693b74b-5cb0-406b-851b-b58075cfb346',
    startDate: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763'
  })

  expect(associatedAction.userId).toBe('0693b74b-5cb0-406b-851b-b58075cfb346')
})

test('Test Associated Action entity actionId', () => {
  const associatedAction = new AssociatedAction({
    userId: '0693b74b-5cb0-406b-851b-b58075cfb346',
    startDate: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763'
  })

  expect(associatedAction.actionId).toBe('a879c273-86de-4d49-b049-b7cb6ef9a763')
})

// From JSON and to JSON tests

test('Test Associated Action entity to JSON', () => {
  const associatedAction = new AssociatedAction({
    userId: '0693b74b-5cb0-406b-851b-b58075cfb346',
    startDate: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763'
  })

  expect(associatedAction.toJSON()).toEqual({
    user_id: '0693b74b-5cb0-406b-851b-b58075cfb346',
    start_date: 1000,
    action_id: 'a879c273-86de-4d49-b049-b7cb6ef9a763'
  })

  expect(associatedAction.toJSON()).toBeInstanceOf(Object)
})

test('Test Associated Action entity from JSON', () => {
  const associatedAction = {
    user_id: uuid(),
    start_date: 1000,
    action_id: uuid()
  }

  expect(AssociatedAction.fromJSON(associatedAction)).toBeInstanceOf(
    AssociatedAction
  )
})

// Invalid attributes tests

test('Test Associated Action entity error userId', () => {
  expect(() => {
    new AssociatedAction({
      userId: '',
      startDate: 1000,
      actionId: uuid()
    })
  }).toThrowError(EntityError)

  expect(() => {
    new AssociatedAction({
      userId: '',
      startDate: 1000,
      actionId: uuid()
    })
  }).toThrowError('Field props.userId is not valid')
})
