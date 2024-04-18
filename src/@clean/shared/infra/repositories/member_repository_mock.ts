import { IMemberRepository } from '../../../modules/member/domain/repositories/member_repository_interface'
import { Member } from '../../domain/entities/member'
import { ACTIVE } from '../../domain/enums/active_enum'
import { COURSE } from '../../domain/enums/course_enum'
import { ROLE } from '../../domain/enums/role_enum'
import { STACK } from '../../domain/enums/stack_enum'

export class MemberRepositoryMock implements IMemberRepository {
  private members: Member[] = [
    new Member({
      name: 'Digao Siqueira',
      email: 'dsiqueira.devmaua@gmail.com',
      ra: '22006800',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11999999999',
      course: COURSE.CIC,
      hiredDate: 1612137600000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      emailDev: 'dsiqueira.devmaua@gmail.com'
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
      emailDev: 'bfevs.devmaua@maua.com'
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
      emailDev: 'rcube.devmaua@gmai.com'
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
      emailDev: 'esakas.devmaua@gmail.com'
    }),
    new Member({
      name: 'Lounis Televisas',
      email: 'ltelevision.devmaua@gmail.com',
      ra: '19017311',
      role: ROLE.DEV,
      stack: STACK.DATA_SCIENCE,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.CIC,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee623',
      emailDev: 'ltelevision.devmaua@gmail.com'
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
      emailDev: 'jbranco.devmaua@gmail.com'
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
      year
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

  async updateMember(
    newName?: string,
    newEmailDev?: string,
    newRole?: ROLE,
    newStack?: STACK,
    newYear?: number,
    newCellphone?: string,
    newCourse?: COURSE,
    newActive?: ACTIVE
  ): Promise<Member> {
    const member = this.members[0]

    this.members = this.members.filter((m) => m.userId !== member.userId)

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

    this.members.push(member)

    return member
  }

  async deleteMember(): Promise<Member> {
    const member = this.members[0]

    this.members = this.members.filter((m) => m.userId !== member.userId)

    return member
  }
}
