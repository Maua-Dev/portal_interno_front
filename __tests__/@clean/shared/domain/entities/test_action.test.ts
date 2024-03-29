import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import '@testing-library/jest-dom'

test('Test Action Entity', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action).toBeInstanceOf(Action)
})

test('Test Action Entity ownerRa', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.ownerRa).toBe('21002100')
})

test('Test Action Entity startDate', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.startDate).toBe(1000)
})

test('Test Action Entity endDate', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.endDate).toBe(2000)
})

test('Test Action Entity duration', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.duration).toBe(1000)
})

test('Test Action Entity actionId', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.actionId).toBe('4000')
})

test('Test Action Entity title', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.title).toBe('Test Action Entity')
})

test('Test Action Entity projectCode', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.projectCode).toBe('76')
})

test('Test Action Entity associatedMembersRa', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337', '21008338'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action.associatedMembersRa).toEqual(['21008337', '21008338'])
  if (action.associatedMembersRa != undefined) {
    action.associatedMembersRa.forEach((associatedMembersRa) => {
      expect(associatedMembersRa).toMatch(/^\d{8}$/)
    })
  }
})

test('Test Action Entity stackTags', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337', '21008338'],
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
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337', '21008338'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action.actionTypeTag).toBe(ACTION_TYPE.CODE)
  expect(Object.values(ACTION_TYPE)).toContain(action.actionTypeTag)
})

test('Test Action Entity to JSON', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337', '21008338'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action.toJSON()).toEqual({
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
    stack_tags: [STACK.FRONTEND, STACK.BACKEND],
    action_type_tag: ACTION_TYPE.CODE
  })

  expect(action.toJSON()).toBeInstanceOf(Object)
})

test('Test Action Entity from JSON', () => {
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

  const actionFromJSON = Action.fromJSON(action)
  expect(actionFromJSON).toBeInstanceOf(Action)
})

test('Test Action Entity with invalid ownerRa', () => {
  expect(() => {
    new Action({
      ownerRa: '21.00210.0',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)

  expect(() => {
    new Action({
      ownerRa: '21.00210.0',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.ownerRa is not valid')
})

test('Test Action Entity with invalid endDate', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 500,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 500,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.endDate is not valid')
})

test('Test Action Entity with invalid storyId', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: -100,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: -100,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.storyId is not valid')
})

test('Test Action Entity with invalid title', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'xxx',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'xxx',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.title is not valid')
})

test('Test Action Entity with invalid description', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'xxx',
      projectCode: '76',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'xxx',
      projectCode: '76',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.description is not valid')
})

test('Test Action Entity with invalid projectCode', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '762',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '762',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.projectCode is not valid')
})

test('Test Action Entity with invalid actionId', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '111',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '111',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.actionId is not valid')
})

test('Test Action Entity with empty associatedMembersRa', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: [],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action).toBeInstanceOf(Action)
  expect(action.associatedMembersRa).toStrictEqual([])
})

test('Test Action Entity with invalid associatedMembersRa', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['kkk', '21.00210.0'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['kkk', '21.00210.0'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.associatedMembersRa is not valid')
})

test('Test Action Entity with invalid number associatedMembersRa', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21.00210-0'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21.00210-0'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.associatedMembersRa is not valid')
})

test('Test Action Entity with invalid stackTags', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 1000,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21008337'],
      stackTags: [],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.stackTags is not valid')
})

test('Test Action Entity with invalid duration', () => {
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 0,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Action({
      ownerRa: '21002100',
      startDate: 1000,
      endDate: 2000,
      duration: 0,
      actionId: '4000',
      storyId: 1,
      title: 'Test Action Entity',
      description: 'Testing',
      projectCode: '76',
      associatedMembersRa: ['21.00833-7'],
      stackTags: [STACK.FRONTEND, STACK.BACKEND],
      actionTypeTag: ACTION_TYPE.CODE
    })
  }).toThrowError('Field props.duration is not valid')
})

test('Test Action Entity without storyId prop', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.storyId).toBe(-1)
})

test('Test Action Entity without description prop', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.description).toBe('')
})

test('Test Action Entity without associatedMembersRa prop', () => {
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1,
    title: 'Test Action Entity',
    description: 'Testing',
    projectCode: '76',
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })
  expect(action.associatedMembersRa).toStrictEqual([])
})
