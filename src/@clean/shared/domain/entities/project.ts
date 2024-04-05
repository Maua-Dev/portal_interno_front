import { EntityError } from '../helpers/errors/domain_error'

export type ProjectProps = {
  code: string
  name: string
  description: string
  poUserId: string
  scrumUserId: string
  startDate: number
  membersUserIds: string[]
  photos: string[]
}

export type JsonProps = {
  code: string
  name: string
  description: string
  po_user_id: string
  scrum_user_id: string
  start_date: number
  members_user_ids: string[]
  photos: string[]
}

export class Project {
  constructor(public props: ProjectProps) {
    if (!Project.validateCode(props.code)) {
      throw new EntityError('props.code')
    }
    this.props.code = props.code

    if (!Project.validateName(props.name)) {
      throw new EntityError('props.name')
    }
    this.props.name = props.name

    if (!Project.validateDescription(props.description)) {
      throw new EntityError('props.description')
    }
    this.props.description = props.description

    if (!Project.validateUserId(props.poUserId)) {
      throw new EntityError('props.poUserId')
    }
    this.props.poUserId = props.poUserId

    if (!Project.validateUserId(props.scrumUserId)) {
      throw new EntityError('props.scrumUserId')
    }
    this.props.scrumUserId = props.scrumUserId

    if (typeof props.startDate !== 'number') {
      throw new EntityError('props.startDate')
    }
    if (props.startDate < 0) {
      throw new EntityError('props.startDate')
    }
    if (props.startDate > Date.now() * 1000) {
      throw new EntityError('props.startDate')
    }
    this.props.startDate = props.startDate

    if (props.photos !== undefined) {
      if (Array.isArray(props.photos)) {
        props.photos.forEach((photo) => {
          if (typeof photo !== 'string') {
            throw new EntityError('props.photos')
          }
        })
      }
      this.props.photos = props.photos
    }

    if (!Array.isArray(props.membersUserIds)) {
      throw new EntityError('props.membersUserIds')
    }

    if (props.membersUserIds.length < 1) {
      throw new EntityError('props.membersUserIds')
    }

    if (
      !props.membersUserIds.includes(props.poUserId) &&
      !props.membersUserIds.includes(props.scrumUserId)
    ) {
      throw new EntityError('props.membersUserIds')
    }

    this.props.membersUserIds = props.membersUserIds
  }

  // Getters and Setters

  get code() {
    return this.props.code
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get poUserId() {
    return this.props.poUserId
  }

  get scrumUserId() {
    return this.props.scrumUserId
  }

  get startDate() {
    return this.props.startDate
  }

  get membersUserIds() {
    return this.props.membersUserIds
  }

  get photos() {
    return this.props.photos
  }

  set setCode(code: string) {
    if (!Project.validateCode(code)) {
      throw new EntityError('props.code')
    }
    this.props.code = code
  }

  set setName(name: string) {
    if (!Project.validateName(name)) {
      throw new EntityError('props.name')
    }
    this.props.name = name
  }

  set setDescription(description: string) {
    if (!Project.validateDescription(description)) {
      throw new EntityError('props.description')
    }
    this.props.description = description
  }

  set setPoUserId(poUserId: string) {
    if (!Project.validateUserId(poUserId)) {
      throw new EntityError('props.poUserId')
    }
    this.props.poUserId = poUserId
  }

  set setScrumUserId(scrumUserId: string) {
    if (!Project.validateUserId(scrumUserId)) {
      throw new EntityError('props.scrumUserId')
    }
    this.props.scrumUserId = scrumUserId
  }

  set setStartDate(startDate: number) {
    if (typeof startDate !== 'number') {
      throw new EntityError('props.startDate')
    }
    if (startDate < 0) {
      throw new EntityError('props.startDate')
    }
    if (startDate > Date.now() * 1000) {
      throw new EntityError('props.startDate')
    }
    this.props.startDate = startDate
  }

  set setMembersUserIds(membersUserIds: string[]) {
    if (!Array.isArray(membersUserIds)) {
      throw new EntityError('props.membersUserIds')
    }

    if (membersUserIds.length < 1) {
      throw new EntityError('props.membersUserIds')
    }

    if (
      !membersUserIds.includes(this.props.poUserId) &&
      !membersUserIds.includes(this.props.scrumUserId)
    ) {
      throw new EntityError('props.membersUserIds')
    }

    this.props.membersUserIds = membersUserIds
  }

  set setPhotos(photos: string[]) {
    if (Array.isArray(photos)) {
      photos.forEach((photo) => {
        if (typeof photo !== 'string') {
          throw new EntityError('props.photos')
        }
      })
    }
    this.props.photos = photos
  }

  // JSON Conversion

  static fromJSON(json: JsonProps) {
    return new Project({
      code: json.code,
      name: json.name,
      description: json.description,
      poUserId: json.po_user_id,
      scrumUserId: json.scrum_user_id,
      startDate: json.start_date,
      membersUserIds: json.members_user_ids,
      photos: json.photos
    })
  }

  toJSON() {
    return {
      code: this.code,
      name: this.name,
      description: this.description,
      po_user_id: this.poUserId,
      scrum_user_id: this.scrumUserId,
      start_date: this.startDate,
      members_user_ids: this.membersUserIds,
      photos: this.photos
    }
  }

  // Validations

  static validateCode(code: string): boolean {
    if (code == null) {
      return false
    } else if (typeof code !== 'string') {
      return false
    } else if (code.length !== 2) {
      return false
    } else if (code !== code.toUpperCase()) {
      return false
    } else if (!code.match(/^[A-Za-z]+$/)) {
      return false
    }
    return true
  }

  static validateName(name: string): boolean {
    if (name == null) {
      return false
    } else if (typeof name !== 'string') {
      return false
    } else if (name.length < 3) {
      return false
    }
    return true
  }

  static validateDescription(description: string): boolean {
    if (description == null) {
      return false
    } else if (typeof description !== 'string') {
      return false
    }
    return true
  }

  static validateUserId(userId: string): boolean {
    if (userId == null) {
      return false
    } else if (typeof userId !== 'string') {
      return false
    } else if (userId.length !== 36) {
      return false
    }
    return true
  }
}
