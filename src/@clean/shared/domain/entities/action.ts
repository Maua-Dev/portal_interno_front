import { ACTION_TYPE, actionTypeToEnum } from '../enums/action_type_enum'
import { STACK, stackToEnum } from '../enums/stack_enum'
import { EntityError } from '../helpers/errors/domain_error'

export type JsonProps = {
  ownerRa: string
  startDate: number
  endDate: number
  duration: number
  actionId: string
  storyId?: number
  title: string
  description?: string
  projectCode: string
  associatedMembersRa?: string[]
  stackTags: string[]
  actionTypeTag: string
}

export type ActionProps = {
  ownerRa: string
  startDate: number
  endDate: number
  duration: number
  actionId: string
  storyId?: number
  title: string
  description?: string
  projectCode: string
  associatedMembersRa?: string[]
  stackTags: STACK[]
  actionTypeTag: ACTION_TYPE
}

export class Action {
  constructor(public props: ActionProps) {
    if (!Action.validateOwnerRa(props.ownerRa)) {
      throw new EntityError('props.ownerRa')
    }
    this.props.ownerRa = props.ownerRa

    if (!Action.validateStartDate(props.startDate)) {
      throw new EntityError('props.startDate')
    }
    this.props.startDate = props.startDate

    if (!Action.validateEndDate(props.endDate, props.startDate)) {
      throw new EntityError('props.endDate')
    }
    this.props.endDate = props.endDate

    if (
      !Action.validateDuration(props.duration, props.startDate, props.endDate)
    ) {
      throw new EntityError('props.duration')
    }
    this.props.duration = props.duration

    if (!Action.validateActionId(props.actionId)) {
      throw new EntityError('props.actionId')
    }
    this.props.actionId = props.actionId

    if (props.storyId != null) {
      if (!Action.validateStoryId(props.storyId)) {
        throw new EntityError('props.storyId')
      }
      this.props.storyId = props.storyId
    } else {
      this.props.storyId = -1
    }

    if (!Action.validateTitle(props.title)) {
      throw new EntityError('props.title')
    }
    this.props.title = props.title

    if (props.description != null) {
      if (!Action.validateDescription(props.description)) {
        throw new EntityError('props.description')
      }
      this.props.description = props.description
    } else {
      this.props.description = ''
    }

    if (!Action.validateProjectCode(props.projectCode)) {
      throw new EntityError('props.projectCode')
    }
    this.props.projectCode = props.projectCode

    if (props.associatedMembersRa != null) {
      if (!Action.validateAssociatedMembersRa(props.associatedMembersRa)) {
        throw new EntityError('props.associatedMembersRa')
      }
      this.props.associatedMembersRa = props.associatedMembersRa
    } else {
      this.props.associatedMembersRa = []
    }

    if (!Action.validateStackTags(props.stackTags)) {
      throw new EntityError('props.stackTags')
    }
    this.props.stackTags = props.stackTags

    if (!Action.validateActionTypeTag(props.actionTypeTag)) {
      throw new EntityError('props.actionTypeTag')
    }
    this.props.actionTypeTag = props.actionTypeTag
  }

  // Getters and Setters

  get ownerRa() {
    return this.props.ownerRa
  }

  set ownerRa(ownerRa: string) {
    if (!Action.validateOwnerRa(ownerRa)) {
      throw new EntityError('props.ownerRa')
    }
    this.props.ownerRa = ownerRa
  }

  get startDate() {
    return this.props.startDate
  }

  set startDate(startDate: number) {
    if (!Action.validateStartDate(startDate)) {
      throw new EntityError('props.startDate')
    }
    this.props.startDate = startDate
  }

  get endDate() {
    return this.props.endDate
  }

  set endDate(endDate: number) {
    if (!Action.validateEndDate(endDate, this.startDate)) {
      throw new EntityError('props.endDate')
    }
    this.props.endDate = endDate
  }

  get duration() {
    return this.props.duration
  }

  set duration(duration: number) {
    if (!Action.validateDuration(duration, this.startDate, this.endDate)) {
      throw new EntityError('props.duration')
    }
    this.props.duration = duration
  }

  get actionId() {
    return this.props.actionId
  }

  set actionId(actionId: string) {
    if (!Action.validateActionId(actionId)) {
      throw new EntityError('props.actionId')
    }
    this.props.actionId = actionId
  }

  get storyId() {
    if (this.props.storyId == null) {
      return -1
    }
    return this.props.storyId
  }

  set storyId(storyId: number) {
    if (!Action.validateStoryId(storyId)) {
      throw new EntityError('props.storyId')
    }
    this.props.storyId = storyId
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    if (!Action.validateTitle(title)) {
      throw new EntityError('props.title')
    }
    this.props.title = title
  }

  get description() {
    if (this.props.description == null) {
      return ''
    }
    return this.props.description
  }

  set description(description: string) {
    if (!Action.validateDescription(description)) {
      throw new EntityError('props.description')
    }
    this.props.description = description
  }

  get projectCode() {
    return this.props.projectCode
  }

  set projectCode(projectCode: string) {
    if (!Action.validateProjectCode(projectCode)) {
      throw new EntityError('props.projectCode')
    }
    this.props.projectCode = projectCode
  }

  get associatedMembersRa() {
    if (this.props.associatedMembersRa == null) {
      return []
    }
    return this.props.associatedMembersRa
  }

  set associatedMembersRa(associatedMembersRa: string[]) {
    if (!Action.validateAssociatedMembersRa(associatedMembersRa)) {
      throw new EntityError('props.associatedMembersRa')
    }
    this.props.associatedMembersRa = associatedMembersRa
  }

  get stackTags() {
    return this.props.stackTags
  }

  set stackTags(stackTags: STACK[]) {
    if (!Action.validateStackTags(stackTags)) {
      throw new EntityError('props.stackTags')
    }
    this.props.stackTags = stackTags
  }

  get actionTypeTag() {
    return this.props.actionTypeTag
  }

  set actionTypeTag(actionTypeTag: ACTION_TYPE) {
    if (!Action.validateActionTypeTag(actionTypeTag)) {
      throw new EntityError('props.actionTypeTag')
    }
    this.props.actionTypeTag = actionTypeTag
  }

  // JSON conversion

  toJSON() {
    return {
      ownerRa: this.ownerRa,
      startDate: this.startDate,
      endDate: this.endDate,
      duration: this.duration,
      actionId: this.actionId,
      storyId: this.storyId,
      title: this.title,
      description: this.description,
      projectCode: this.projectCode,
      associatedMembersRa: this.associatedMembersRa,
      stackTags: this.stackTags,
      actionTypeTag: this.actionTypeTag
    }
  }

  static fromJSON(json: JsonProps) {
    return new Action({
      ownerRa: json.ownerRa,
      startDate: json.startDate,
      endDate: json.endDate,
      duration: json.duration,
      actionId: json.actionId,
      storyId: json.storyId,
      title: json.title,
      description: json.description,
      projectCode: json.projectCode,
      associatedMembersRa: json.associatedMembersRa,
      stackTags: json.stackTags.map((stackTag) => stackToEnum(stackTag)),
      actionTypeTag: actionTypeToEnum(json.actionTypeTag)
    })
  }

  // Validate functions
  static validateOwnerRa(ra: string) {
    const regexRa = /^\d{2}\.\d{5}-\d$/
    if (ra == null) {
      return false
    } else if (typeof ra !== 'string') {
      return false
    } else if (!ra.match(regexRa)) {
      return false
    }
    return true
  }

  static validateStartDate(startDate: number) {
    if (startDate == null) {
      return false
    } else if (typeof startDate !== 'number') {
      return false
    }
    return true
  }

  static validateEndDate(endDate: number, startDate: number) {
    if (endDate == null) {
      return false
    } else if (typeof endDate !== 'number') {
      return false
    } else if (endDate < startDate) {
      return false
    }
    return true
  }

  static validateDuration(
    duration: number,
    startDate: number,
    endDate: number
  ) {
    if (typeof duration !== 'number') {
      return false
    } else if (duration <= 0) {
      return false
    } else if (duration !== endDate - startDate) {
      return false
    }
    return true
  }

  static validateActionId(actionId: string) {
    if (actionId == null) {
      return false
    } else if (typeof actionId !== 'string') {
      return false
    } else if (actionId.length < 4) {
      return false
    }
    return true
  }

  static validateStoryId(storyId: number) {
    if (storyId !== null) {
      if (typeof storyId !== 'number') {
        return false
      } else if (storyId < 100 || storyId > 9999) {
        return false
      }
    }
    return true
  }

  static validateTitle(title: string) {
    if (title == null) {
      return false
    } else if (typeof title !== 'string') {
      return false
    } else if (title.length < 4 || title.length > 100) {
      return false
    }
    return true
  }

  static validateDescription(description: string) {
    if (description != null) {
      if (typeof description !== 'string') {
        return false
      } else if (description.length < 4 || description.length > 500) {
        return false
      }
    }
    return true
  }

  static validateProjectCode(projectCode: string) {
    if (projectCode == null) {
      return false
    } else if (typeof projectCode !== 'string') {
      return false
    } else if (projectCode.length !== 2) {
      return false
    }
    return true
  }

  static validateAssociatedMembersRa(associatedMembersRa: string[]) {
    if (associatedMembersRa != null) {
      if (Array.isArray(associatedMembersRa) === false) {
        return false
      } else if (associatedMembersRa.length === 0) {
        return false
      } else if (
        associatedMembersRa.every((ra) => this.validateOwnerRa(ra)) === false
      ) {
        return false
      }
    }
    return true
  }

  static validateStackTags(stackTags: STACK[]) {
    if (stackTags == null) {
      return false
    } else if (Array.isArray(stackTags) === false) {
      return false
    } else if (stackTags.length === 0) {
      return false
    } else if (
      stackTags.every((stack) => Object.values(STACK).includes(stack)) === false
    ) {
      return false
    }
    return true
  }

  static validateActionTypeTag(actionTypeTag: ACTION_TYPE) {
    if (actionTypeTag == null) {
      return false
    } else if (typeof actionTypeTag !== 'string') {
      return false
    }
    return true
  }
}
