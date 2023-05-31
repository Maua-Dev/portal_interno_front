import { ACTION_TYPE, actionTypeToEnum } from '../enums/action_type_enum'
import { STACK, stackToEnum } from '../enums/stack_enum'
import { EntityError } from '../helpers/errors/domain_error'

export type JsonProps = {
  owner_ra: string
  start_time: number
  end_time: number
  action_id: string
  title: string
  project_code: string
  associated_members_ra: string[]
  stack_tags: string[]
  action_type_tags: string[]
}

export type ActionProps = {
  owner_ra: string
  start_time: number
  end_time: number
  action_id: string
  title: string
  project_code: string
  associated_members_ra: string[]
  stack_tags: STACK[]
  action_type_tags: ACTION_TYPE[]
}

export class Action {
  constructor(public props: ActionProps) {
    if (!Action.validateOwnerRa(props.owner_ra)) {
      throw new EntityError('props.owner_ra')
    }
    this.props.owner_ra = props.owner_ra

    if (!Action.validateStartTime(props.start_time)) {
      throw new EntityError('props.start_time')
    }
    this.props.start_time = props.start_time

    if (!Action.validateEndTime(props.end_time)) {
      throw new EntityError('props.end_time')
    }
    this.props.end_time = props.end_time

    if (!Action.validateActionId(props.action_id)) {
      throw new EntityError('props.action_id')
    }
    this.props.action_id = props.action_id

    if (!Action.validateTitle(props.title)) {
      throw new EntityError('props.title')
    }
    this.props.title = props.title

    if (!Action.validateProjectCode(props.project_code)) {
      throw new EntityError('props.project_code')
    }
    this.props.project_code = props.project_code

    if (!Action.validateAssociatedMembersRa(props.associated_members_ra)) {
      throw new EntityError('props.associated_members_ra')
    }
    this.props.associated_members_ra = props.associated_members_ra

    if (!Action.validateStackTags(props.stack_tags)) {
      throw new EntityError('props.stack_tags')
    }
    this.props.stack_tags = props.stack_tags

    if (!Action.validateActionTypeTags(props.action_type_tags)) {
      throw new EntityError('props.action_type_tags')
    }
    this.props.action_type_tags = props.action_type_tags
  }

  // Getters and Setters

  get owner_ra() {
    return this.props.owner_ra
  }

  set setOwnerRa(owner_ra: string) {
    if (!Action.validateOwnerRa(owner_ra)) {
      throw new EntityError('props.owner_ra')
    }
    this.props.owner_ra = owner_ra
  }

  get start_time() {
    return this.props.start_time
  }

  set setStartTime(start_time: number) {
    if (!Action.validateStartTime(start_time)) {
      throw new EntityError('props.start_time')
    }
    this.props.start_time = start_time
  }

  get end_time() {
    return this.props.end_time
  }

  set setEndTime(end_time: number) {
    if (!Action.validateEndTime(end_time)) {
      throw new EntityError('props.end_time')
    }
    this.props.end_time = end_time
  }

  get action_id() {
    return this.props.action_id
  }

  set setActionId(action_id: string) {
    if (!Action.validateActionId(action_id)) {
      throw new EntityError('props.action_id')
    }
    this.props.action_id = action_id
  }

  get title() {
    return this.props.title
  }

  set setTitle(title: string) {
    if (!Action.validateTitle(title)) {
      throw new EntityError('props.title')
    }
    this.props.title = title
  }

  get project_code() {
    return this.props.project_code
  }

  set setProjectCode(project_code: string) {
    if (!Action.validateProjectCode(project_code)) {
      throw new EntityError('props.project_code')
    }
    this.props.project_code = project_code
  }

  get associated_members_ra() {
    return this.props.associated_members_ra
  }

  set setAssociatedMembersRa(associated_members_ra: string[]) {
    if (!Action.validateAssociatedMembersRa(associated_members_ra)) {
      throw new EntityError('props.associated_members_ra')
    }
    this.props.associated_members_ra = associated_members_ra
  }

  get stack_tags() {
    return this.props.stack_tags
  }

  set setStackTags(stack_tags: STACK[]) {
    if (!Action.validateStackTags(stack_tags)) {
      throw new EntityError('props.stack_tags')
    }
    this.props.stack_tags = stack_tags
  }

  get action_type_tags() {
    return this.props.action_type_tags
  }

  set setActionTypeTags(action_type_tags: ACTION_TYPE[]) {
    if (!Action.validateActionTypeTags(action_type_tags)) {
      throw new EntityError('props.action_type_tags')
    }
    this.props.action_type_tags = action_type_tags
  }

  // JSON conversion

  toJSON() {
    return {
      owner_ra: this.owner_ra,
      start_time: this.start_time,
      end_time: this.end_time,
      action_id: this.action_id,
      title: this.title,
      project_code: this.project_code,
      associated_members_ra: this.associated_members_ra,
      stack_tags: this.stack_tags,
      action_type_tags: this.action_type_tags
    }
  }

  static fromJSON(json: JsonProps) {
    return new Action({
      owner_ra: json.owner_ra,
      start_time: json.start_time,
      end_time: json.end_time,
      action_id: json.action_id,
      title: json.title,
      project_code: json.project_code,
      associated_members_ra: json.associated_members_ra,
      stack_tags: json.stack_tags.map((stack_tag) => stackToEnum(stack_tag)),
      action_type_tags: json.action_type_tags.map((action_type_tag) =>
        actionTypeToEnum(action_type_tag)
      )
    })
  }

  // Validate functions
  static validateOwnerRa(ra: string) {
    const regex_ra = /^\d{2}\.\d{5}-\d$/
    if (ra == null) {
      return false
    } else if (typeof ra !== 'string') {
      return false
    } else if (!ra.match(regex_ra)) {
      return false
    }
    return true
  }

  static validateStartTime(start_time: number) {
    if (start_time == null) {
      return false
    } else if (typeof start_time != 'number') {
      return false
    }
    return true
  }

  static validateEndTime(end_time: number) {
    if (end_time == null) {
      return false
    } else if (typeof end_time != 'number') {
      return false
    }
    return true
  }

  static validateActionId(action_id: string) {
    if (action_id == null) {
      return false
    } else if (typeof action_id != 'string') {
      return false
    } else if (action_id.length < 4) {
      return false
    }
    return true
  }

  static validateTitle(title: string) {
    if (title == null) {
      return false
    } else if (typeof title != 'string') {
      return false
    } else if (title.length < 4 || title.length > 100) {
      return false
    }
    return true
  }

  static validateProjectCode(project_code: string) {
    if (project_code == null) {
      return false
    } else if (typeof project_code != 'string') {
      return false
    } else if (project_code.length != 2) {
      return false
    }
    return true
  }

  static validateAssociatedMembersRa(associated_members_ra: string[]) {
    if (associated_members_ra == null) {
      return false
    } else if (Array.isArray(associated_members_ra) == false) {
      return false
    } else if (associated_members_ra.length == 0) {
      return false
    } else if (
      associated_members_ra.every((ra) => this.validateOwnerRa(ra)) == false
    ) {
      return false
    }
    return true
  }

  static validateStackTags(stack_tags: STACK[]) {
    if (stack_tags == null) {
      return false
    } else if (Array.isArray(stack_tags) == false) {
      return false
    } else if (stack_tags.length == 0) {
      return false
    } else if (
      stack_tags.every((stack) => Object.values(STACK).includes(stack)) == false
    ) {
      return false
    }
    return true
  }

  static validateActionTypeTags(action_type_tags: ACTION_TYPE[]) {
    if (action_type_tags == null) {
      return false
    } else if (Array.isArray(action_type_tags) == false) {
      return false
    } else if (action_type_tags.length == 0) {
      return false
    } else if (
      action_type_tags.every((action_type) =>
        Object.values(ACTION_TYPE).includes(action_type)
      ) == false
    ) {
      return false
    }
    return true
  }
}
