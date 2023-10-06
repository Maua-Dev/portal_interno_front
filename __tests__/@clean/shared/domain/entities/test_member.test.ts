import { Member } from '../../../../../src/@clean/shared/domain/entities/member'
import { Project } from '../../../../../src/@clean/shared/domain/entities/project'
import { ACTIVE } from '../../../../../src/@clean/shared/domain/enums/active_enum'
import { COURSE } from '../../../../../src/@clean/shared/domain/enums/course_enum'
import { ROLE } from '../../../../../src/@clean/shared/domain/enums/role_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import '@testing-library/jest-dom'

test('Test Member Entity', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member).toBeInstanceOf(Member)
})

test('Test Member Entity RA', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.ra).toBe('21.00210-0')
})

test('Test Member Entity Name', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.name).toBe('Furlan mata pomba')
})

test('Test Member Entity email', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.email).toBe('furlas@maua.br')
})

test('Test Member Entity role', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.role).toBe(ROLE.DEV)
  expect(Object.values(ROLE)).toContain(member.role)
})

test('Test Member Entity stack', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.stack).toBe(STACK.FRONTEND)
  expect(Object.values(STACK)).toContain(member.stack)
})

test('Test Member Entity year', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.year).toBe(2)
})

test('Test Member Entity cellphone', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.cellphone).toBe('11999999999')
})

test('Test Member Entity course', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.course).toBe(COURSE.ECM)
  expect(Object.values(COURSE)).toContain(member.course)
})

test('Test Member Entity hiredDate', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.hiredDate).toBe(10)
})

test('Test Member Entity deactivatedDate', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.deactivatedDate).toBe(-1)
})

test('Test Member Entity active', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member.active).toBe(ACTIVE.ACTIVE)
  expect(Object.values(ACTIVE)).toContain(member.active)
})

test('Test Member Entity projects', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })

  const expectedProject = {
    code: 'PI',
    name: 'Portal Interno',
    description: 'Site controle de membros'
  }

  const receivedProject = member.projects[0].props

  expect(member.projects.length).toBe(1)
  expect(receivedProject.code).toEqual(expectedProject.code)
  expect(receivedProject.name).toEqual(expectedProject.name)
  expect(receivedProject.description).toEqual(expectedProject.description)
})

test('Test Member Entity to JSON', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })

  expect(member.toJSON()).toEqual({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    deactivatedDate: -1,
    hiredDate: 10,
    active: ACTIVE.ACTIVE,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })

  expect(member.toJSON()).toBeInstanceOf(Object)
})

test('Test Member Entity from JSON', () => {
  const member = {
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: 'DEV',
    stack: 'FRONTEND',
    year: 2,
    cellphone: '11999999999',
    course: 'ECM',
    hired_date: 10,
    active: 'ACTIVE',
    projects: [
      {
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      }
    ]
  }

  const memberFromJSON = Member.fromJSON(member)

  expect(memberFromJSON).toBeInstanceOf(Member)
})

test('Test Member Entity with invalid name', () => {
  expect(() => {
    new Member({
      name: 'F',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'F',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError('Field props.name is not valid')
})

test('Test Member Entity with invalid email', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: '123', //furlas@maua.br
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: '123', //furlas@maua.br
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
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
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
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
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError('Field props.ra is not valid')
})

test('Test Member Entity with invalid year', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: -1,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: -1,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError('Field props.year is not valid')
})

test('Test Member Entity with invalid cellphone', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '119999931239999',
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '119999931239999', //11999999999
      course: COURSE.ECM,
      hiredDate: 10,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError('Field props.cellphone is not valid')
})

test('Test Member Entity with invalid hiredDate', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: -1,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999', //11999999999
      course: COURSE.ECM,
      hiredDate: -1,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError('Field props.hiredDate is not valid')
})

test('Test Member Entity with invalid deactivatedDate', () => {
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 10,
      deactivatedDate: -2,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError(EntityError)
  expect(() => {
    new Member({
      name: 'Furlan mata pomba',
      email: 'furlas@maua.br',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 2,
      cellphone: '11999999999', //11999999999
      course: COURSE.ECM,
      hiredDate: 10,
      deactivatedDate: -2,
      active: ACTIVE.ACTIVE,
      projects: [
        new Project({
          code: 'PI',
          name: 'Portal Interno',
          description: 'Site controle de membros'
        })
      ]
    })
  }).toThrowError('Field props.deactivatedDate is not valid')
})

test('Test Member Entity with deactivatedDate prop', () => {
  const member = new Member({
    name: 'Furlan mata pomba',
    email: 'furlas@maua.br',
    ra: '21.00210-0',
    role: ROLE.DEV,
    stack: STACK.FRONTEND,
    year: 2,
    cellphone: '11999999999',
    course: COURSE.ECM,
    hiredDate: 10,
    deactivatedDate: 20,
    active: ACTIVE.DISCONNECTED,
    projects: [
      new Project({
        code: 'PI',
        name: 'Portal Interno',
        description: 'Site controle de membros'
      })
    ]
  })
  expect(member).toBeInstanceOf(Member)
  expect(member.deactivatedDate).toBe(20)
})
