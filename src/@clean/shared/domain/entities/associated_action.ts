import { EntityError } from '../helpers/errors/domain_error'
import { Action, ActionJsonProps, ActionProps } from './action'

export type AssociatedActionProps = {
  memberRa: string
  action: ActionProps
}

export type AssociatedActionJsonProps = {
  member_ra: string
  action: ActionJsonProps
}

export class AssociatedAction {
  constructor(public props: AssociatedActionProps) {
    if (!AssociatedAction.validateMemberRa(props.memberRa)) {
      throw new EntityError('props.memberRa')
    }
    this.props.memberRa = props.memberRa

    if (!(props.action instanceof Action)) {
      throw new EntityError('props.action')
    }
    this.props.action = props.action
  }

  // Getters and Setters

  get memberRa() {
    return this.props.memberRa
  }

  get action() {
    return this.props.action
  }

  set setMemberRa(memberRa: string) {
    if (!AssociatedAction.validateMemberRa(memberRa)) {
      throw new EntityError('props.memberRa')
    }
    this.props.memberRa = memberRa
  }

  set setAction(action: Action) {
    if (!(action instanceof Action)) {
      throw new EntityError('props.action')
    }
    this.props.action = action
  }

  // JSON Conversion

  static fromJSON(json: AssociatedActionJsonProps): AssociatedAction {
    return new AssociatedAction({
      memberRa: json.member_ra,
      action: Action.fromJSON(json.action)
    })
  }

  toJSON() {
    return {
      member_ra: this.memberRa,
      action: {
        owner_ra: this.action.ownerRa,
        start_date: this.action.startDate,
        end_date: this.action.endDate,
        duration: this.action.duration,
        action_id: this.action.actionId,
        story_id: this.action.storyId,
        title: this.action.title,
        description: this.action.description,
        project_code: this.action.projectCode,
        associated_members_ra: this.action.associatedMembersRa,
        stack_tags: this.action.stackTags,
        action_type_tag: this.action.actionTypeTag
      }
    }
  }

  //Validations

  static validateMemberRa(memberRa: string): boolean {
    if (memberRa == null) {
      return false
    } else if (typeof memberRa != 'string') {
      return false
    } else if (memberRa.length != 8) {
      return false
    } else if (!memberRa.match(/^\d{8}$/)) {
      return false
    }
    return true
  }
}
