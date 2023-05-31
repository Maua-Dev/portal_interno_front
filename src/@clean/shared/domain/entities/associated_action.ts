import { actionTypeToEnum } from '../enums/action_type_enum'
import { stackToEnum } from '../enums/stack_enum'
import { EntityError } from '../helpers/errors/domain_error'
import { Action, ActionProps } from './action'

export type AssociatedActionProps = {
  member_ra: string
  action: ActionProps
}

export type JsonProps = {
  member_ra: string
  action: {
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
}

export class AssociatedAction {
  constructor(public props: AssociatedActionProps) {
    if (!AssociatedAction.validateMemberRa(props.member_ra)) {
      throw new EntityError('props.member_ra')
    }
    this.props.member_ra = props.member_ra

    if (!(props.action instanceof Action)) {
      throw new EntityError('props.action')
    }
    this.props.action = props.action
  }

  // Getters and Setters

  get member_ra() {
    return this.props.member_ra
  }

  get action() {
    return this.props.action
  }

  set setMemberRa(member_ra: string) {
    if (!AssociatedAction.validateMemberRa(member_ra)) {
      throw new EntityError('props.member_ra')
    }
    this.props.member_ra = member_ra
  }

  set setAction(action: Action) {
    if (!(action instanceof Action)) {
      throw new EntityError('props.action')
    }
    this.props.action = action
  }

  // JSON Conversion

  static fromJSON(json: JsonProps): AssociatedAction {
    return new AssociatedAction({
      member_ra: json.member_ra,
      action: Action.fromJSON(json.action)
    })
  }

  toJSON() {
    return {
      member_ra: this.member_ra,
      action: this.action
    }
  }

  //Validations

  static validateMemberRa(member_ra: string): boolean {
    if (member_ra == null) {
      return false
    } else if (typeof member_ra != 'string') {
      return false
    } else if (member_ra.length != 10) {
      return false
    } else if (!member_ra.match(/^\d{2}\.\d{5}-\d$/)) {
      return false
    }
    return true
  }
}
