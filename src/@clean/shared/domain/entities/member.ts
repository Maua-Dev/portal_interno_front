import { ACTIVE, activeToEnum } from '../enums/active_enum'
import { COURSE, courseToEnum } from '../enums/course_enum'
import { ROLE, roleToEnum } from '../enums/role_enum'
import { STACK, stackToEnum } from '../enums/stack_enum'
import { EntityError } from '../helpers/errors/domain_error'

export type JsonProps = {
  member: {
    name: string
    email_dev: string
    email: string
    ra: string
    role: string
    stack: string
    year: number
    cellphone: string
    course: string
    hired_date: number
    deactivated_date?: number
    active: string
    user_id: string
  }
  message: string
}

export type MemberProps = {
  name: string
  emailDev: string
  email: string
  ra: string
  role: ROLE // ENUM
  stack: STACK // ENUM
  year: number
  cellphone: string
  course: COURSE // ENUM
  hiredDate: number
  deactivatedDate?: number
  active: ACTIVE // ENUM
  userId: string
}

export class Member {
  constructor(public props: MemberProps) {
    if (!Member.validateName(props.name)) {
      throw new EntityError('props.name')
    }
    this.props.name = props.name

    if (!Member.validateEmail(props.email)) {
      throw new EntityError('props.email')
    }
    this.props.email = props.email

    if (!Member.validateRa(props.ra)) {
      throw new EntityError('props.ra')
    }
    this.props.ra = props.ra

    if (!Member.validateRole(props.role)) {
      throw new EntityError('props.role')
    }
    this.props.role = props.role

    if (!Member.validateStack(props.stack)) {
      throw new EntityError('props.stack')
    }
    this.props.stack = props.stack

    if (!Member.validateYear(props.year)) {
      throw new EntityError('props.year')
    }
    this.props.year = props.year

    if (!Member.validateCellphone(props.cellphone)) {
      throw new EntityError('props.cellphone')
    }
    this.props.cellphone = props.cellphone

    if (!Member.validateCourse(props.course)) {
      throw new EntityError('props.course')
    }
    this.props.course = props.course

    if (!Member.validateHiredDate(props.hiredDate)) {
      throw new EntityError('props.hiredDate')
    }
    this.props.hiredDate = props.hiredDate

    if (props.deactivatedDate != null) {
      if (
        !Member.validateDeactivatedDate(props.deactivatedDate, props.hiredDate)
      ) {
        throw new EntityError('props.deactivatedDate')
      }
      if (this.active === ACTIVE.ACTIVE) {
        throw new EntityError('props.deactivatedDate')
      }
      this.props.deactivatedDate = props.deactivatedDate
    } else {
      this.props.deactivatedDate = -1
    }

    if (!Member.validateActive(props.active)) {
      throw new EntityError('props.active')
    }
    this.props.active = props.active
  }

  // Getters and Setters

  get name() {
    return this.props.name
  }

  set name(name: string) {
    if (!Member.validateName(name)) {
      throw new EntityError('name')
    }
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    if (!Member.validateEmail(email)) {
      throw new EntityError('email')
    }
    this.props.email = email
  }

  get ra() {
    return this.props.ra
  }

  set ra(ra: string) {
    if (!Member.validateRa(ra)) {
      throw new EntityError('ra')
    }
    this.props.ra = ra
  }

  get role() {
    return this.props.role
  }

  set role(role: ROLE) {
    if (!Member.validateRole(role)) {
      throw new EntityError('role')
    }
    this.props.role = role
  }

  get stack() {
    return this.props.stack
  }

  set stack(stack: STACK) {
    if (!Member.validateStack(stack)) {
      throw new EntityError('stack')
    }
    this.props.stack = stack
  }

  get year() {
    return this.props.year
  }

  set year(year: number) {
    if (!Member.validateYear(year)) {
      throw new EntityError('year')
    }
    this.props.year = year
  }

  get cellphone() {
    return this.props.cellphone
  }

  set cellphone(cellphone: string) {
    if (!Member.validateCellphone(cellphone)) {
      throw new EntityError('cellphone')
    }
    this.props.cellphone = cellphone
  }

  get course() {
    return this.props.course
  }

  set course(course: COURSE) {
    if (!Member.validateCourse(course)) {
      throw new EntityError('course')
    }
    this.props.course = course
  }

  get hiredDate() {
    return this.props.hiredDate
  }

  set hiredDate(hiredDate: number) {
    if (!Member.validateHiredDate(hiredDate)) {
      throw new EntityError('hiredDate')
    }
    this.props.hiredDate = hiredDate
  }

  get deactivatedDate() {
    if (this.props.deactivatedDate == null) {
      return -1
    }
    return this.props.deactivatedDate
  }

  set deactivatedDate(deactivatedDate: number) {
    if (
      !Member.validateDeactivatedDate(
        this.props.deactivatedDate ?? -1,
        this.props.hiredDate
      )
    ) {
      throw new EntityError('deactivatedDate')
    }
    this.props.deactivatedDate = deactivatedDate
  }

  get active() {
    return this.props.active
  }

  set active(active: ACTIVE) {
    if (!Member.validateActive(active)) {
      throw new EntityError('active')
    }
    this.props.active = active
  }

  get userId() {
    return this.props.userId
  }

  set userId(userId: string) {
    if (!Member.validateUserId(userId)) {
      throw new EntityError('userId')
    }
    this.props.userId = userId
  }

  get emailDev() {
    return this.props.emailDev
  }

  set emailDev(emailDev: string) {
    if (!Member.validateEmailDev(emailDev)) {
      throw new EntityError('emailDev')
    }
    this.props.emailDev = emailDev
  }

  // JSON conversion

  toJSON() {
    return {
      name: this.name,
      email_dev: this.emailDev,
      email: this.email,
      ra: this.ra,
      role: this.role,
      stack: this.stack,
      year: this.year,
      cellphone: this.cellphone,
      course: this.course,
      hired_date: this.hiredDate,
      deactivated_date: this.deactivatedDate,
      active: this.active,
      user_id: this.userId
    }
  }

  static fromJSON(json: JsonProps) {
    return new Member({
      name: json.member.name,
      emailDev: json.member.email_dev,
      email: json.member.email,
      ra: json.member.ra,
      role: roleToEnum(json.member.role),
      stack: stackToEnum(json.member.stack),
      year: json.member.year,
      cellphone: json.member.cellphone,
      course: courseToEnum(json.member.course),
      hiredDate: json.member.hired_date,
      deactivatedDate: json.member.deactivated_date,
      active: activeToEnum(json.member.active),
      userId: json.member.user_id
    })
  }

  // Validate functions
  static validateName(name: string): boolean {
    if (name == null) {
      return false
    } else if (typeof name !== 'string') {
      return false
    } else if (name.length < 2) {
      return false
    }
    return true
  }

  static validateEmail(email: string) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email == null) {
      return false
    } else if (typeof email !== 'string') {
      return false
    } else if (!email.match(regexEmail)) {
      return false
    }
    return true
  }

  static validateRa(ra: string) {
    const regexRa = /^\d{8}$/
    if (ra == null) {
      return false
    } else if (typeof ra !== 'string') {
      return false
    } else if (!ra.match(regexRa)) {
      return false
    }
    return true
  }

  static validateRole(role: ROLE) {
    if (role == null) {
      return false
    } else if (typeof role !== 'string') {
      return false
    }
    return true
  }

  static validateStack(stack: STACK) {
    if (stack == null) {
      return false
    } else if (typeof stack !== 'string') {
      return false
    }
    return true
  }

  static validateYear(year: number) {
    if (year == null) {
      return false
    } else if (typeof year !== 'number') {
      return false
    }
    return year > 0 && year <= 6
  }

  static validateCellphone(cellphone: string) {
    if (cellphone == null) {
      return false
    } else if (typeof cellphone !== 'string') {
      return false
    } else if (cellphone.length !== 11) {
      return false
    }
    return true
  }

  static validateCourse(course: COURSE) {
    if (course == null) {
      return false
    } else if (typeof course !== 'string') {
      return false
    }
    return true
  }

  static validateHiredDate(hiredDate: number) {
    if (hiredDate == null) {
      return false
    } else if (typeof hiredDate !== 'number') {
      return false
    } else if (hiredDate < 0) {
      return false
    }
    return true
  }

  static validateDeactivatedDate(deactivatedDate: number, hiredDate: number) {
    if (deactivatedDate != null) {
      if (typeof deactivatedDate !== 'number') {
        return false
      } else if (deactivatedDate < 0) {
        return false
      } else if (deactivatedDate < hiredDate) {
        return false
      }
    }
    return true
  }

  static validateActive(active: ACTIVE) {
    if (active == null) {
      return false
    } else if (typeof active !== 'string') {
      return false
    }
    return true
  }

  static validateUserId(userId: string) {
    if (userId == null) {
      return false
    } else if (typeof userId !== 'string') {
      return false
    } else if (userId.length !== 36) {
      return false
    }
    return true
  }

  static validateEmailDev(emailDev: string) {
    const regexEmail = /^\w+\.devmaua@gmail\.com$/

    if (emailDev == null) {
      return false
    } else if (typeof emailDev !== 'string') {
      return false
    } else if (!emailDev.match(regexEmail)) {
      return false
    }
    return true
  }
}
