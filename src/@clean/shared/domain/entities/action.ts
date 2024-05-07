import { ACTION_TYPE, actionTypeToEnum } from '../enums/action_type_enum'
import { STACK, stackToEnum } from '../enums/stack_enum'
import { EntityError } from '../helpers/errors/domain_error'

export type ActionJsonProps = {
  user_id: string
  start_date: number
  end_date: number
  duration: number
  action_id: string
  is_valid: boolean
  story_id?: number
  title: string
  description?: string
  project_code: string
  associated_members_user_ids?: string[]
  stack_tags: string[]
  action_type_tag: string
}

export type ActionProps = {
  userId: string
  startDate: number
  title: string
  description?: string
  actionId: string
  isValid: boolean
  endDate: number
  duration: number
  projectCode: string
  storyId?: number
  associatedMembersUserIds?: string[]
  stackTags?: STACK[]
  actionTypeTag?: ACTION_TYPE
}

export class Action {
  constructor(public props: ActionProps) {
    if (!props.userId) {
      throw new EntityError('props.userId')
    }
    if (typeof props.userId !== 'string') {
      throw new EntityError('props.userId')
    }
    this.props.userId = props.userId

    if (!Action.validateStartDate(props.startDate)) {
      throw new EntityError('props.startDate')
    }
    this.props.startDate = props.startDate

    if (!Action.validateEndDate(props.endDate)) {
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

    if (typeof props.isValid !== 'boolean') {
      throw new EntityError('props.isValid')
    }
    this.props.isValid = props.isValid

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

    if (props.associatedMembersUserIds != null) {
      if (
        !Action.validateAssociatedMembersUserIds(props.associatedMembersUserIds)
      ) {
        throw new EntityError('props.associatedMembersUserIds')
      }
      this.props.associatedMembersUserIds = props.associatedMembersUserIds
    }

    if (props.stackTags && !Action.validateStackTags(props.stackTags)) {
      throw new EntityError('props.stackTags')
    }
    this.props.stackTags = props.stackTags

    if (
      props.actionTypeTag &&
      !Action.validateActionTypeTag(props.actionTypeTag)
    ) {
      throw new EntityError('props.actionTypeTag')
    }
    this.props.actionTypeTag = props.actionTypeTag
  }

  // Getters and Setters

  get userId() {
    return this.props.userId
  }

  set userId(userId: string) {
    if (!Action.validateUserId(userId)) {
      throw new EntityError('props.userId')
    }
    this.props.userId = userId
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
    if (!Action.validateEndDate(endDate)) {
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

  get isValid() {
    return this.props.isValid
  }

  set isValid(isValid: boolean) {
    if (typeof isValid !== 'boolean') {
      throw new EntityError('props.isValid')
    }
    this.props.isValid = isValid
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

  get associatedMembersUserIds() {
    if (this.props.associatedMembersUserIds == null) {
      return []
    }
    return this.props.associatedMembersUserIds
  }

  set associatedMembersUserIds(associatedMembersUserIds: string[]) {
    if (!Action.validateAssociatedMembersUserIds(associatedMembersUserIds)) {
      throw new EntityError('props.associatedMembersUserIds')
    }
    this.props.associatedMembersUserIds = associatedMembersUserIds
  }

  get stackTags() {
    return this.props.stackTags || []
  }

  set stackTags(stackTags: STACK[]) {
    if (!Action.validateStackTags(stackTags)) {
      throw new EntityError('props.stackTags')
    }
    this.props.stackTags = stackTags
  }

  get actionTypeTag() {
    return this.props.actionTypeTag as ACTION_TYPE
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
      user_id: this.userId,
      start_date: this.startDate,
      end_date: this.endDate,
      duration: this.duration,
      action_id: this.actionId,
      is_valid: this.isValid,
      story_id: this.storyId,
      title: this.title,
      description: this.description,
      project_code: this.projectCode,
      associated_members_user_ids: this.associatedMembersUserIds,
      stack_tags: this.stackTags,
      action_type_tag: this.actionTypeTag
    }
  }

  static fromJSON(json: ActionJsonProps) {
    return new Action({
      userId: json.user_id,
      startDate: json.start_date,
      endDate: json.end_date,
      duration: json.duration,
      actionId: json.action_id,
      isValid: json.is_valid,
      storyId: json.story_id,
      title: json.title,
      description: json.description || '',
      projectCode: json.project_code,
      associatedMembersUserIds: json.associated_members_user_ids,
      stackTags: json.stack_tags.map((stackTag) => stackToEnum(stackTag)),
      actionTypeTag: actionTypeToEnum(json.action_type_tag)
    })
  }

  // Validate functions
  static validateUserId(_userId: string) {
    // if (typeof userId !== 'string') {
    //   return false
    // }
    // if (!validate(userId)) {
    //   return false
    // }
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

  static validateEndDate(endDate: number) {
    if (endDate == null) {
      return false
    } else if (typeof endDate !== 'number') {
      return false
    } else if (endDate <= 0) {
      return false
    }
    return true
  }

  static validateDuration(
    duration: number,
    _startDate: number,
    _endDate: number
  ) {
    if (typeof duration !== 'number') {
      return false
    } else if (duration <= 0) {
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
      } else if (storyId < 1 || storyId > 999999) {
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

  static validateAssociatedMembersUserIds(associatedMembersUsersIds: string[]) {
    if (associatedMembersUsersIds != null) {
      if (Array.isArray(associatedMembersUsersIds) === false) {
        return false
      } else if (
        associatedMembersUsersIds.every((userId) =>
          this.validateUserId(userId)
        ) === false
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
