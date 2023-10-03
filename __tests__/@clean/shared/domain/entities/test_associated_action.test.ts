import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
import { AssociatedAction } from '../../../../../src/@clean/shared/domain/entities/associated_action'
import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import '@testing-library/jest-dom'

// Instance Test

test('Test Associated Action entity', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  const associatedAction = new AssociatedAction({
    memberRa: '20021940',
    action: action
  })

  expect(associatedAction).toBeInstanceOf(AssociatedAction)
})

// Properties Tests

test('Test Associated Action entity memberRa', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  const associatedAction = new AssociatedAction({
    memberRa: '20021940',
    action: action
  })

  expect(associatedAction.memberRa).toBe('20021940')
})

test('Test Associated Action entity action', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  const associatedAction = new AssociatedAction({
    memberRa: '20021940',
    action: action
  })

  expect(associatedAction.action).toEqual(
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1000,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  )
})

// From JSON and to JSON tests

test('Test Associated Action entity to JSON', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  const associatedAction = new AssociatedAction({
    memberRa: '20021940',
    action: action
  })

  expect(associatedAction.toJSON()).toEqual({
    member_ra: '20021940',
    action: {
      owner_ra: '21002100',
      start_date: 1000,
      end_date: 2000,
      duration: 1000,
      action_id: '4000',
      story_id: 1000,
      title: 'Test Action Entity',
      description: 'Testing',
      project_code: '76',
      associated_members_ra: ['21008337'],
      stack_tags: ['FRONTEND', 'BACKEND'],
      action_type_tag: 'CODE'
    }
  })

  expect(associatedAction.toJSON()).toBeInstanceOf(Object)
})

test('Test Associated Action entity from JSON', () => {
  const action = {
    owner_ra: '21002100',
    start_date: 1000,
    end_date: 2000,
    duration: 1000,
    action_id: '4000',
    story_id: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    project_code: '76',
    associated_members_ra: ['21008337', '21008338'],
    stack_tags: ['FRONTEND', 'BACKEND'],
    action_type_tag: 'CODE'
  }
  const associatedAction = {
    member_ra: '20021940',
    action: action
  }

  expect(AssociatedAction.fromJSON(associatedAction)).toBeInstanceOf(
    AssociatedAction
  )
})

// Invalid attributes tests

test('Test Associated Action entity error memberRa', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(() => {
    new AssociatedAction({
      memberRa: '20.02194-0',
      action: action
    })
  }).toThrowError(EntityError)

  expect(() => {
    new AssociatedAction({
      memberRa: '20.02194-0',
      action: action
    })
  }).toThrowError('Field props.memberRa is not valid')
})
