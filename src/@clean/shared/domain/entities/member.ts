import { ACTIVE, activeToEnum } from '../enums/active_enum'
import { COURSE, courseToEnum } from '../enums/course_enum'
import { ROLE, roleToEnum } from '../enums/role_enum'
import { STACK, stackToEnum } from '../enums/stack_enum'

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
    deactivated_date?: number | null
    active: string
    user_id: string
    hours_worked: number
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
  deactivatedDate?: number | null
  active: ACTIVE // ENUM
  userId: string
  hoursWorked: number // milliseconds
}

export class Member {
  private _name: string
  private _emailDev: string
  private _email: string
  private _ra: string
  private _role: ROLE
  private _stack: STACK
  private _year: number
  private _cellphone: string
  private _course: COURSE
  private _hiredDate: number
  private _deactivatedDate?: number | null
  private _active: ACTIVE
  private _userId: string
  private _hoursWorked: number
  constructor({
    name,
    emailDev,
    email,
    ra,
    role,
    stack,
    year,
    cellphone,
    course,
    hiredDate,
    deactivatedDate,
    active,
    userId,
    hoursWorked
  }: MemberProps) {
    this._name = name
    this._emailDev = emailDev
    this._email = email
    this._ra = ra
    this._role = role
    this._stack = stack
    this._year = year
    this._cellphone = cellphone
    this._course = course
    this._hiredDate = hiredDate
    this._deactivatedDate = deactivatedDate
    this._active = active
    this._userId = userId
    this._hoursWorked = hoursWorked
  }

  // Getters and Setters

  get name() {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get email() {
    return this._email
  }

  set email(email: string) {
    this._email = email
  }

  get ra() {
    return this._ra
  }

  set ra(ra: string) {
    this._ra = ra
  }

  get role() {
    return this._role
  }

  set role(role: ROLE) {
    this._role = role
  }

  get stack() {
    return this._stack
  }

  set stack(stack: STACK) {
    this._stack = stack
  }

  get year() {
    return this._year
  }

  set year(year: number) {
    this._year = year
  }

  get cellphone() {
    return this._cellphone
  }

  set cellphone(cellphone: string) {
    this._cellphone = cellphone
  }

  get course() {
    return this._course
  }

  set course(course: COURSE) {
    this._course = course
  }

  get hiredDate() {
    return this._hiredDate
  }

  set hiredDate(hiredDate: number) {
    this._hiredDate = hiredDate
  }

  get deactivatedDate() {
    if (!this._deactivatedDate) return 0

    return this._deactivatedDate
  }

  set deactivatedDate(deactivatedDate: number) {
    this._deactivatedDate = deactivatedDate
  }

  get active() {
    return this._active
  }

  set active(active: ACTIVE) {
    this._active = active
  }

  get userId() {
    return this._userId
  }

  set userId(userId: string) {
    this._userId = userId
  }

  get emailDev() {
    return this._emailDev
  }

  set emailDev(emailDev: string) {
    this._emailDev = emailDev
  }

  get hoursWorked() {
    return this._hoursWorked
  }

  set hoursWorked(hoursWorked: number) {
    this._hoursWorked = hoursWorked
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
      user_id: this.userId,
      hours_worked: this.hoursWorked
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
      userId: json.member.user_id,
      hoursWorked: json.member.hours_worked
    })
  }
}
