import { ACTION_TYPE, actionTypeToEnum } from '../enums/action_type_enum'
import { STACK, stackToEnum } from '../enums/stack_enum'
import { EntityError } from '../helpers/errors/domain_error'

export type JsonProps = {
  ownerRa: string
  startTime: number
  endTime: number
  actionId: string
  title: string
  projectCode: string
  associatedMembersRa: string[]
  stackTags: string[]
  actionTypeTags: string[]
}

export type ActionProps = {
  ownerRa: string
  startTime: number
  endTime: number
  actionId: string
  title: string
  projectCode: string
  associatedMembersRa: string[]
  stackTags: STACK[]
  actionTypeTags: ACTION_TYPE[]
}

export class Action {
  constructor(public props: ActionProps) {
    if (!Action.validateOwnerRa(props.ownerRa)) {
      throw new EntityError('props.ownerRa')
    }
    this.props.ownerRa = props.ownerRa

    if (!Action.validateStartTime(props.startTime)) {
      throw new EntityError('props.startTime')
    }
    this.props.startTime = props.startTime

    if (!Action.validateEndTime(props.endTime)) {
      throw new EntityError('props.endTime')
    }
    this.props.endTime = props.endTime

    if (!Action.validateActionId(props.actionId)) {
      throw new EntityError('props.actionId')
    }
    this.props.actionId = props.actionId

    if (!Action.validateTitle(props.title)) {
      throw new EntityError('props.title')
    }
    this.props.title = props.title

    if (!Action.validateProjectCode(props.projectCode)) {
      throw new EntityError('props.projectCode')
    }
    this.props.projectCode = props.projectCode

    if (!Action.validateAssociatedMembersRa(props.associatedMembersRa)) {
      throw new EntityError('props.associatedMembersRa')
    }
    this.props.associatedMembersRa = props.associatedMembersRa

    if (!Action.validateStackTags(props.stackTags)) {
      throw new EntityError('props.stackTags')
    }
    this.props.stackTags = props.stackTags

    if (!Action.validateActionTypeTags(props.actionTypeTags)) {
      throw new EntityError('props.actionTypeTags')
    }
    this.props.actionTypeTags = props.actionTypeTags
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

  get startTime() {
    return this.props.startTime
  }

  set startTime(startTime: number) {
    if (!Action.validateStartTime(startTime)) {
      throw new EntityError('props.startTime')
    }
    this.props.startTime = startTime
  }

  get endTime() {
    return this.props.endTime
  }

  set endTime(endTime: number) {
    if (!Action.validateEndTime(endTime)) {
      throw new EntityError('props.endTime')
    }
    this.props.endTime = endTime
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

  get title() {
    return this.props.title
  }

  set title(title: string) {
    if (!Action.validateTitle(title)) {
      throw new EntityError('props.title')
    }
    this.props.title = title
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

  get actionTypeTags() {
    return this.props.actionTypeTags
  }

  set actionTypeTags(actionTypeTags: ACTION_TYPE[]) {
    if (!Action.validateActionTypeTags(actionTypeTags)) {
      throw new EntityError('props.actionTypeTags')
    }
    this.props.actionTypeTags = actionTypeTags
  }

  // JSON conversion

  toJSON() {
    return {
      ownerRa: this.ownerRa,
      startTime: this.startTime,
      endTime: this.endTime,
      actionId: this.actionId,
      title: this.title,
      projectCode: this.projectCode,
      associatedMembersRa: this.associatedMembersRa,
      stackTags: this.stackTags,
      actionTypeTags: this.actionTypeTags
    }
  }

  static fromJSON(json: JsonProps) {
    return new Action({
      ownerRa: json.ownerRa,
      startTime: json.startTime,
      endTime: json.endTime,
      actionId: json.actionId,
      title: json.title,
      projectCode: json.projectCode,
      associatedMembersRa: json.associatedMembersRa,
      stackTags: json.stackTags.map((stackTag) => stackToEnum(stackTag)),
      actionTypeTags: json.actionTypeTags.map((actionTypeTag) =>
        actionTypeToEnum(actionTypeTag)
      )
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

  static validateStartTime(startTime: number) {
    if (startTime == null) {
      return false
    } else if (typeof startTime !== 'number') {
      return false
    }
    return true
  }

  static validateEndTime(endTime: number) {
    if (endTime == null) {
      return false
    } else if (typeof endTime !== 'number') {
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
    if (associatedMembersRa == null) {
      return false
    } else if (Array.isArray(associatedMembersRa) === false) {
      return false
    } else if (associatedMembersRa.length === 0) {
      return false
    } else if (
      associatedMembersRa.every((ra) => this.validateOwnerRa(ra)) === false
    ) {
      return false
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

  static validateActionTypeTags(actionTypeTags: ACTION_TYPE[]) {
    if (actionTypeTags == null) {
      return false
    } else if (Array.isArray(actionTypeTags) === false) {
      return false
    } else if (actionTypeTags.length === 0) {
      return false
    } else if (
      actionTypeTags.every((actionType) =>
        Object.values(ACTION_TYPE).includes(actionType)
      ) === false
    ) {
      return false
    }
    return true
  }
}
