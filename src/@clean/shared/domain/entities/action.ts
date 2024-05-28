import { ACTION_TYPE, actionTypeToEnum } from '../enums/action_type_enum'
import { STACK, stackToEnum } from '../enums/stack_enum'

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

interface ActionInterface {
  toJson(): ActionJsonProps
}

export class Action implements ActionInterface {
  private _userId: string
  private _startDate: number
  private _title: string
  private _description?: string
  private _actionId: string
  private _isValid: boolean
  private _endDate: number
  private _duration: number
  private _projectCode: string
  private _storyId?: number
  private _associatedMembersUserIds?: string[]
  private _stackTags?: STACK[]
  private _actionTypeTag?: ACTION_TYPE

  constructor({
    userId,
    title,
    description,
    actionId,
    isValid,
    startDate,
    endDate,
    duration,
    projectCode,
    storyId,
    associatedMembersUserIds,
    stackTags,
    actionTypeTag
  }: ActionProps) {
    this._userId = userId
    this._startDate = startDate
    this._endDate = endDate
    this._duration = duration
    this._actionId = actionId
    this._isValid = isValid
    this._storyId = storyId
    this._title = title
    this._description = description
    this._projectCode = projectCode
    this._associatedMembersUserIds = associatedMembersUserIds
    this._stackTags = stackTags
    this._actionTypeTag = actionTypeTag
  }
  toJson(): ActionJsonProps {
    throw new Error('Method not implemented.')
  }

  // Getters and Setters

  get userId() {
    return this._userId
  }

  set userId(userId: string) {
    this._userId = userId
  }

  get startDate() {
    return this._startDate
  }

  set startDate(startDate: number) {
    this._startDate = startDate
  }

  get endDate() {
    return this._endDate
  }

  set endDate(endDate: number) {
    this._endDate = endDate
  }

  get duration() {
    return this._duration
  }

  set duration(duration: number) {
    this._duration = duration
  }

  get actionId() {
    return this._actionId
  }

  set actionId(actionId: string) {
    this._actionId = actionId
  }

  get storyId(): number | undefined {
    return this._storyId
  }

  set storyId(storyId: number) {
    this._storyId = storyId
  }

  get isValid() {
    return this._isValid
  }

  set isValid(isValid: boolean) {
    this._isValid = isValid
  }

  get title() {
    return this._title
  }

  set title(title: string) {
    this._title = title
  }

  get description() {
    return this._description || ''
  }

  set description(description: string) {
    this._description = description
  }

  get projectCode() {
    return this._projectCode
  }

  set projectCode(projectCode: string) {
    this._projectCode = projectCode
  }

  get associatedMembersUserIds() {
    return this._associatedMembersUserIds || []
  }

  set associatedMembersUserIds(associatedMembersUserIds: string[]) {
    this._associatedMembersUserIds = associatedMembersUserIds
  }

  get stackTags() {
    return this._stackTags || []
  }

  set stackTags(stackTags: STACK[]) {
    this._stackTags = stackTags
  }

  get actionTypeTag() {
    return this._actionTypeTag as ACTION_TYPE
  }

  set actionTypeTag(actionTypeTag: ACTION_TYPE) {
    this._actionTypeTag = actionTypeTag
  }

  // JSON conversion

  toJSON() {
    return {
      user_id: this._userId,
      start_date: this._startDate,
      end_date: this._endDate,
      duration: this._duration,
      action_id: this._actionId,
      is_valid: this._isValid,
      story_id: this._storyId,
      title: this._title,
      description: this._description,
      project_code: this._projectCode,
      associated_members_user_ids: this._associatedMembersUserIds,
      stack_tags: this._stackTags,
      action_type_tag: this._actionTypeTag
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
}
