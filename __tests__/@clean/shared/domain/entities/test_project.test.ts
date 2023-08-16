import { Project } from '../../../../../src/@clean/shared/domain/entities/project'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import '@testing-library/jest-dom'

test('Test Project entity', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros'
  })
  expect(project).toBeInstanceOf(Project)
})

// Properties Tests

test('Test Project entity code', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros'
  })
  expect(project.code).toBe('PI')
})

test('Test Project entity name', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros'
  })
  expect(project.name).toBe('Portal Interno')
})

test('Test Project entity description', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros'
  })
  expect(project.description).toBe('Site controle de membros')
})

// From JSON and to JSON tests

test('Test Project entity to JSON', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros'
  })

  expect(project.toJSON()).toBeInstanceOf(Object)
})

test('Test Project entity from JSON', () => {
  const project = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros'
  })

  expect(Project.fromJSON(project)).toBeInstanceOf(Project)
})

// Invalid attributes tests

test('Test Project entity error code', () => {
  expect(() => {
    new Project({
      code: 'pi',
      name: 'Portal Interno',
      description: 'Site controle de membros'
    })
  }).toThrowError(EntityError)

  expect(() => {
    new Project({
      code: 'pi',
      name: 'Portal Interno',
      description: 'Site controle de membros'
    })
  }).toThrowError('Field props.code is not valid')
})

test('Test Project entity error name', () => {
  expect(() => {
    new Project({
      code: 'PI',
      name: '--',
      description: 'Site controle de membros'
    })
  }).toThrowError(EntityError)

  expect(() => {
    new Project({
      code: 'PI',
      name: '--',
      description: 'Site controle de membros'
    })
  }).toThrowError('Field props.name is not valid')
})
