import { Member } from '../../../../../src/@clean/shared/domain/entities/member'
import { ACTIVE } from '../../../../../src/@clean/shared/domain/enums/active_enum'
import { COURSE } from '../../../../../src/@clean/shared/domain/enums/course_enum'
import { ROLE } from '../../../../../src/@clean/shared/domain/enums/role_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import { test, expect } from 'vitest'

test('Test Member Entity', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member).toBeInstanceOf(Member)
})

test('Test Member Entity RA', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.ra).toBe('21002100')
})

test('Test Member Entity Name', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.name).toBe('Furlan mata pomba')
})

test('Test Member Entity email', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.email).toBe('furlas@maua.br')
})

test('Test Member Entity role', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.role).toBe(ROLE.DEV)
  expect(Object.values(ROLE)).toContain(member.role)
})

test('Test Member Entity stack', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.stack).toBe(STACK.FRONTEND)
  expect(Object.values(STACK)).toContain(member.stack)
})

test('Test Member Entity year', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.year).toBe(2)
})

test('Test Member Entity cellphone', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.cellphone).toBe('11999999999')
})

test('Test Member Entity course', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.course).toBe(COURSE.ECM)
  expect(Object.values(COURSE)).toContain(member.course)
})

test('Test Member Entity hiredDate', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.hiredDate).toBe(10)
})

test('Test Member Entity deactivatedDate', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.deactivatedDate).toBe(-1)
})

test('Test Member Entity active', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member.active).toBe(ACTIVE.ACTIVE)
  expect(Object.values(ACTIVE)).toContain(member.active)
})

test('Test Member Entity emailDev', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })

  expect(member.emailDev).toBe('furlan.devmaua@gmail.com')
})

test('Test Member Entity to JSON', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })

  expect(member.toJSON()).toEqual({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    deactivated_date: -1,
    hired_date: 10,
    active: ACTIVE.ACTIVE,
    email_dev: 'furlan.devmaua@gmail.com',
    user_id: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })

  expect(member.toJSON()).toBeInstanceOf(Object)
})

test('Test Member Entity from JSON', () => {
  const member = {
    member: {
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: 'DEV',
      stack: 'FRONTEND',
      year: 2,
      cellphone: '11999999999',
      course: 'ECM',
      hired_date: 10,
      active: 'ACTIVE',
      email_dev: 'furlan.devmaua@gmail.com',
      user_id: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    },
    message: 'Member created successfully'
  }

  const memberFromJSON = Member.fromJSON(member)

  expect(memberFromJSON).toBeInstanceOf(Member)
})

test('Test Member Entity with invalid name', () => {
  expect(() => {
    new Member({
      name: 'F',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'F',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError('Field props.name is not valid')
})

test('Test Member Entity with invalid email', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: '123', //furlas@maua.br
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: '123', //furlas@maua.br
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError('Field props.email is not valid')
})

test('Test Member Entity with invalid ra', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210.0', //21.00210-0
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210.0', //21.00210-0
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError('Field props.ra is not valid')
})

test('Test Member Entity with invalid year', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: -1,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: -1,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError('Field props.year is not valid')
})

test('Test Member Entity with invalid cellphone', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '119999931239999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '119999931239999', //11999999999
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError('Field props.cellphone is not valid')
})

test('Test Member Entity with invalid hiredDate', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: -1,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999', //11999999999
      course: COURSE.ECM,
      hiredDate: -1,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError('Field props.hiredDate is not valid')
})

test('Test Member Entity with invalid deactivatedDate', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      deactivatedDate: -2,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999', //11999999999
      course: COURSE.ECM,
      hiredDate: 10,
      deactivatedDate: -2,
      active: ACTIVE.ACTIVE,
      emailDev: 'furlan.devmaua@gmail.com',
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  }).toThrowError('Field props.deactivatedDate is not valid')
})

test('Test Member Entity with deactivatedDate prop', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21002100',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    deactivatedDate: 20,
    active: ACTIVE.DISCONNECTED,
    emailDev: 'furlan.devmaua@gmail.com',
    userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
  })
  expect(member).toBeInstanceOf(Member)
  expect(member.deactivatedDate).toBe(20)
})
