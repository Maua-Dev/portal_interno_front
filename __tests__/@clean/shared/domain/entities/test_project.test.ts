import { Project } from '../../../../../src/@clean/shared/domain/entities/project'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import { test, expect } from 'vitest'

test('Test Project entity', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros',
    membersUserIds: [
      '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
    ],
    photos: ['https://www.google.com.br', 'https://www.google.com.br'],
    poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
    scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
    startDate: 1000
  })
  expect(project).toBeInstanceOf(Project)
})

// Properties Tests

test('Test Project entity code', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros',
    membersUserIds: [
      '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
    ],
    photos: ['https://www.google.com.br', 'https://www.google.com.br'],
    poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
    scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
    startDate: 1000
  })
  expect(project.code).toBe('PI')
})

test('Test Project entity name', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros',
    membersUserIds: [
      '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
    ],
    photos: ['https://www.google.com.br', 'https://www.google.com.br'],
    poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
    scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
    startDate: 1000
  })
  expect(project.name).toBe('Portal Interno')
})

test('Test Project entity description', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros',
    membersUserIds: [
      '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
    ],
    photos: ['https://www.google.com.br', 'https://www.google.com.br'],
    poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
    scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
    startDate: 1000
  })
  expect(project.description).toBe('Site controle de membros')
})

// From JSON and to JSON tests

test('Test Project entity to JSON', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros',
    membersUserIds: [
      '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
    ],
    photos: ['https://www.google.com.br', 'https://www.google.com.br'],
    poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
    scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
    startDate: 1000
  })

  expect(project.toJSON()).toBeInstanceOf(Object)
})

test('Test Project entity from JSON', () => {
  const project = {
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros',
    members_user_ids: [
      '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
    ],
    photos: ['https://www.google.com.br', 'https://www.google.com.br'],
    po_user_id: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
    scrum_user_id: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
    start_date: 1000
  }

  expect(Project.fromJSON(project)).toBeInstanceOf(Project)
})

// Invalid attributes tests

test('Test Project entity error code', () => {
  expect(() => {
    new Project({
      code: 'pi',
      name: 'Portal Interno',
      description: 'Site controle de membros',
      membersUserIds: [
        '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
        '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
      ],
      photos: ['https://www.google.com.br', 'https://www.google.com.br'],
      poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
      startDate: 1000
    })
  }).toThrowError(EntityError)

  expect(() => {
    new Project({
      code: 'pi',
      name: 'Portal Interno',
      description: 'Site controle de membros',
      membersUserIds: [
        '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
        '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
      ],
      photos: ['https://www.google.com.br', 'https://www.google.com.br'],
      poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
      startDate: 1000
    })
  }).toThrowError('Field props.code is not valid')
})

test('Test Project entity error name', () => {
  expect(() => {
    new Project({
      code: 'PI',
      name: '--',
      description: 'Site controle de membros',
      membersUserIds: [
        '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
        '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
      ],
      photos: ['https://www.google.com.br', 'https://www.google.com.br'],
      poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
      startDate: 1000
    })
  }).toThrowError(EntityError)

  expect(() => {
    new Project({
      code: 'PI',
      name: '--',
      description: 'Site controle de membros',
      membersUserIds: [
        '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
        '6f5g4h7J-876j-0098-123hb-hgb567fy4hb'
      ],
      photos: ['https://www.google.com.br', 'https://www.google.com.br'],
      poUserId: '51ah5jaj-c9jm-1345-666ab-e12341c14a3',
      scrumUserId: '6f5g4h7J-876j-0098-123hb-hgb567fy4hb',
      startDate: 1000
    })
  }).toThrowError('Field props.name is not valid')
})
