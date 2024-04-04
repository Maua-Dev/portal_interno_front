import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import { test, expect } from 'vitest'

test('Test Action Entity', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action).toBeInstanceOf(Action)
})

test('Test Action Entity userId', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.userId).toBe('f28a92a3-0434-4efd-8f1b-a9c0af6ee627')
})

test('Test Action Entity startDate', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.startDate).toBe(1000)
})

test('Test Action Entity endDate', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.endDate).toBe(2000)
})

test('Test Action Entity duration', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.duration).toBe(1000)
})

test('Test Action Entity actionId', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.actionId).toBe('a879c273-86de-4d49-b049-b7cb6ef9a763')
})

test('Test Action Entity isValid', () => {
  const action = new Action({
    userId: '93bc6ada-c0d1-7054-666ab-e17414c48ae3',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.isValid).toBe(true)
})

test('Test Action Entity title', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.title).toBe('Test Action Entity')
})

test('Test Action Entity projectCode', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.projectCode).toBe('76')
})

test('Test Action Entity associatedMembersUserIds', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action.associatedMembersUserIds).toEqual([
    '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
    '4a9019df-ab29-453f-8e8d-1cc845492f12'
  ])
  if (action.associatedMembersUserIds != undefined) {
    action.associatedMembersUserIds.forEach((associatedMembersUserIds) => {
      expect(associatedMembersUserIds.length).toBe(36)
    })
  }
})

test('Test Action Entity stackTags', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action.stackTags).toEqual([STACK.FRONTEND, STACK.BACKEND])
  action.stackTags.forEach((stackTags) => {
    expect(Object.values(STACK)).toContain(stackTags)
  })
})

test('Test Action Entity actionTypeTag', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action.actionTypeTag).toBe(ACTION_TYPE.CODE)
  expect(Object.values(ACTION_TYPE)).toContain(action.actionTypeTag)
})

test('Test Action Entity to JSON', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action.toJSON()).toEqual({
    user_id: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    start_date: 1000,
    end_date: 2000,
    duration: 1000,
    action_id: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    is_valid: true,
    story_id: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    project_code: '76',
    associated_members_user_ids: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stack_tags: [STACK.FRONTEND, STACK.BACKEND],
    action_type_tag: ACTION_TYPE.CODE
  })

  expect(action.toJSON()).toBeInstanceOf(Object)
})

test('Test Action Entity from JSON', () => {
  const action = {
    user_id: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    start_date: 1000,
    end_date: 2000,
    duration: 1000,
    action_id: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    is_valid: true,
    story_id: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    project_code: '76',
    associated_members_user_ids: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stack_tags: ['FRONTEND', 'BACKEND'],
    action_type_tag: 'CODE'
  }

  const actionFromJSON = Action.fromJSON(action)
  expect(actionFromJSON).toBeInstanceOf(Action)
})

test('Test Action Entity with invalid userId', () => {
  expect(() => {
    new Action({
      userId: '',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)

  expect(() => {
    new Action({
      userId: '',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.userId is not valid')
})

test('Test Action Entity with invalid endDate', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: -1,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: -1,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.endDate is not valid')
})

test('Test Action Entity with invalid storyId', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: -100,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: -100,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.storyId is not valid')
})

test('Test Action Entity with invalid title', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'xxx',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'xxx',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.title is not valid')
})

test('Test Action Entity with invalid description', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'xxx',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'xxx',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.description is not valid')
})

test('Test Action Entity with invalid projectCode', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '762',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '762',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.projectCode is not valid')
})

test('Test Action Entity with invalid actionId', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '111',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '111',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.actionId is not valid')
})

test('Test Action Entity with empty associatedMembersUserIds', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action).toBeInstanceOf(Action)
  expect(action.associatedMembersUserIds).toStrictEqual([])
})

test('Test Action Entity with invalid associatedMembersUserIds', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: ['', ''],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [''],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.associatedMembersUserIds is not valid')
})

test('Test Action Entity with invalid number associatedMembersUserIds', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.associatedMembersUserIds is not valid')
})

test('Test Action Entity with invalid stackTags', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.stackTags is not valid')
})

test('Test Action Entity with invalid duration', () => {
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 0,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1000,
      endDate: 2000,
      duration: 0,
      actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
      isValid: true,
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.duration is not valid')
})

test('Test Action Entity without storyId prop', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.storyId).toBe(-1)
})

test('Test Action Entity without description prop', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    projectCode: '76',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.description).toBe('')
})

test('Test Action Entity without associatedMembersUserIds prop', () => {
  const action = new Action({
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: 'a879c273-86de-4d49-b049-b7cb6ef9a763',
    isValid: true,
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.associatedMembersUserIds).toStrictEqual([])
})
