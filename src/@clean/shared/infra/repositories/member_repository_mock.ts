import { decorate, injectable } from 'inversify'
import type { IMemberRepository } from '../../../modules/member/domain/repositories/member_repository_interface'
import { Member } from '../../domain/entities/member'
import { ACTIVE } from '../../domain/enums/active_enum'
import { COURSE } from '../../domain/enums/course_enum'
import { ROLE } from '../../domain/enums/role_enum'
import { STACK } from '../../domain/enums/stack_enum'
// import type { StrikeCreationResponse } from './member_repository_http'
import type { StrikeCreationResponse } from '../../domain/entities/strike'
import { Strike } from '../../domain/entities/strike'
import { STRIKE_CATEGORY } from '../../domain/enums/strike_category_enum'

export class MemberRepositoryMock implements IMemberRepository {
  private members: Member[] = [
    new Member({
      name: 'Digao Siqueira',
      email: 'dsiqueira.devmaua@gmail.com',
      ra: '22006800',
      role: ROLE.DIRECTOR,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11999999999',
      course: COURSE.CIC,
      hiredDate: 1612137600000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      emailDev: 'dsiqueira.devmaua@gmail.com',
      hoursWorked: 3,
      project: ['MF', 'PT', 'SM', 'GM', 'PI'],
      photo: 'photo1',
      strikes: 2,
      strikesId: [],
      strikes_allowed: 4
    }),
    new Member({
      name: 'Bruno fevs',
      email: 'bfevs.devmaua@gmail.com',
      ra: '22222222',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 1612137600000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee626',
      emailDev: 'bfevs.devmaua@maua.com',
      hoursWorked: 3,
      project: ['MF', 'PT', 'SM', 'GM', 'PI'],
      photo: 'photo1',
      strikes: 2,
      strikesId: [],
      strikes_allowed: 4
    }),
    new Member({
      name: 'Rubicks Cube',
      email: 'rcube.devmaua@gmail.com',
      ra: '19017311',
      role: ROLE.DEV,
      stack: STACK.BACKEND,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee625',
      emailDev: 'rcube.devmaua@gmai.com',
      hoursWorked: 3,
      project: ['MF', 'PT', 'SM', 'GM', 'PI'],
      photo: 'photo1',
      strikes: 2,
      strikesId: [],
      strikes_allowed: 4
    }),
    new Member({
      name: 'Enzo sakas',
      email: 'esakas.devmaua@gmail.com',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee624',
      emailDev: 'esakas.devmaua@gmail.com',
      hoursWorked: 3,
      project: ['MF', 'PT', 'SM', 'GM', 'PI'],
      photo: 'photo1',
      strikes: 2,
      strikesId: [],
      strikes_allowed: 4
    }),
    new Member({
      name: 'Lounis Televisas',
      email: 'ltelevision.devmaua@gmail.com',
      ra: '19017311',
      role: ROLE.DEV,
      stack: STACK.INFRA,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.CIC,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee623',
      emailDev: 'ltelevision.devmaua@gmail.com',
      hoursWorked: 3,
      project: ['MF', 'PT', 'SM', 'GM', 'PI'],
      photo: 'photo1',
      strikes: 2,
      strikesId: [],
      strikes_allowed: 4
    }),
    new Member({
      name: 'MAGIC WHITE HANDS',
      email: 'jbranco.devmaua@gmail.com',
      ra: '21008331',
      role: ROLE.DEV,
      stack: STACK.BACKEND,
      year: 3,
      cellphone: '11911758198',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee622',
      emailDev: 'jbranco.devmaua@gmail.com',
      hoursWorked: 3,
      project: ['MF', 'PT', 'SM', 'GM', 'PI'],
      photo: 'photo1',
      strikes: 2,
      strikesId: [],
      strikes_allowed: 4
    })
  ]

  async createMember(
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ): Promise<Member> {
    const member = new Member({
      name: 'MAGIC WHITE HANDS',
      email: 'teste@gmail.com',
      active: ACTIVE.ACTIVE,
      cellphone,
      course,
      emailDev: emailDev,
      hiredDate: 1640192165000,
      ra,
      role,
      stack,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee622',
      year,
      hoursWorked: 3,
      project: ['MF', 'PT', 'SM', 'GM', 'PI'],
      photo: 'photo1',
      strikes: 2,
      strikesId: [],
      strikes_allowed: 4
    })

    this.members.push(member)

    return member
  }

  async getMember(): Promise<Member> {
    return this.members[0]
  }

  async getAllMembers(): Promise<Member[]> {
    return this.members
  }

  async createStrike(
    memberUserId: string,
    reason: STRIKE_CATEGORY,
    comment: string,
    date: number,
    ownerUserId: string
  ): Promise<StrikeCreationResponse> {
    console.log(
      '%c--- MOCK: createStrike ACIONADO ---',
      'color: orange; font-weight: bold;'
    )
    console.log(` striking usuário: ${memberUserId}`)

    return new Promise((resolve) => {
      setTimeout(() => {
        const memberToStrike = this.members.find(
          (m) => m.userId === memberUserId
        )

        if (memberToStrike) {
          memberToStrike.strikes = (memberToStrike.strikes || 0) + 1
          console.log(
            `Strikes de ${memberToStrike.name} atualizado para: ${memberToStrike.strikes}`
          )
        } else {
          console.error(
            `❌ Membro com ID ${memberUserId} não encontrado no mock.`
          )
        }

        const response: StrikeCreationResponse = {
          strike_id: `mock-strike-${Date.now()}`,
          owner_user_id: memberUserId,
          target_user_id: memberUserId,
          applier_user_id: 'mock-admin-id',
          occurred_date: date,
          category: STRIKE_CATEGORY.OTHER, // Fixed from reason to match new enum type
          description: comment,
          case_number: 1,
          message: 'Strike was created successfully via MOCK'
        }

        resolve(response)
      }, 500) // 500ms de atraso
    })
  }

  async updateMember(
    memberUserId: string,
    newName?: string,
    newEmailDev?: string,
    newRole?: ROLE,
    newStack?: STACK,
    newYear?: number,
    newCellphone?: string,
    newCourse?: COURSE,
    newActive?: ACTIVE,
    newPhoto?: string
  ): Promise<Member> {
    const member = this.members[0]

    this.members = this.members.filter((m) => m.userId !== memberUserId)

    if (newName) {
      member.name = newName
    }

    if (newEmailDev) {
      member.emailDev = newEmailDev
    }

    if (newRole) {
      member.role = newRole
    }

    if (newStack) {
      member.stack = newStack
    }

    if (newYear) {
      member.year = newYear
    }

    if (newCellphone) {
      member.cellphone = newCellphone
    }

    if (newCourse) {
      member.course = newCourse
    }

    if (newActive) {
      member.active = newActive
    }

    if (newPhoto) {
      member.photo = newPhoto
    }

    this.members.push(member)

    return member
  }

  async deleteMember(): Promise<Member> {
    const member = this.members[0]

    this.members = this.members.filter((m) => m.userId !== member.userId)

    return member
  }

  getAllMembersAdmin(): Promise<Member[]> {
    // No ambiente de teste/mock queremos simular o endpoint admin retornando todos os membros
    // Em vez de array vazio (que gera NoItemsFoundError nos usecases)
    return Promise.resolve(this.members)
  }

  async deleteStrike(strike_id: string): Promise<void> {
    console.log(
      '%c--- MOCK: deleteStrike ACIONADO ---',
      'color: red; font-weight: bold;'
    )
    console.log(` excluindo strike: ${strike_id}`)
    return Promise.resolve()
  }

  async getStrike(strikeId: string): Promise<Strike> {
    const strike = new Strike({
      strikeId: strikeId, // Use the passed ID
      ownerUserId: 'mock-owner-id',
      targetUserId: 'mock-target-id',
      applierUserId: 'mock-applier-id',
      occurredDate: Date.now(),
      category: STRIKE_CATEGORY.OTHER,
      description: 'Mock Description'
    })
    return Promise.resolve(strike)
  }

  async getAllStrikes(): Promise<Strike[]> {
    return Promise.resolve([
        new Strike({
        strikeId: 'mock-strike-1',
        ownerUserId: 'mock-owner-id',
        targetUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627', // Matching one member
        applierUserId: 'mock-applier-id',
        occurredDate: Date.now(),
        category: STRIKE_CATEGORY.OTHER,
        description: 'Mock Description 1'
        })
    ])
  }
}

decorate(injectable(), MemberRepositoryMock)
