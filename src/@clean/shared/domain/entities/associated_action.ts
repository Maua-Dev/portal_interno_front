import { EntityError } from '../helpers/errors/domain_error'

export type AssociatedActionProps = {
  actionId: string
  startDate: number
  userId: string
}

export type AssociatedActionJsonProps = {
  action_id: string
  start_date: number
  user_id: string
}

export class AssociatedAction {
  constructor(public props: AssociatedActionProps) {
    if (!AssociatedAction.validateActionId(props.actionId)) {
      throw new EntityError('props.actionId')
    }
    this.props.actionId = props.actionId

    if (typeof props.startDate !== 'number') {
      throw new EntityError('props.startDate')
    }
    this.props.startDate = props.startDate

    if (!AssociatedAction.validateUserId(props.userId)) {
      throw new EntityError('props.userId')
    }
    this.props.userId = props.userId
  }

  // Getters and Setters

  get actionId() {
    return this.props.actionId
  }

  get startDate() {
    return this.props.startDate
  }

  get userId() {
    return this.props.userId
  }

  set actionId(actionId: string) {
    if (!AssociatedAction.validateActionId(actionId)) {
      throw new EntityError('props.actionId')
    }
    this.props.actionId = actionId
  }

  set startDate(startDate: number) {
    if (typeof startDate !== 'number') {
      throw new EntityError('props.startDate')
    }
    this.props.startDate = startDate
  }

  set userId(userId: string) {
    if (AssociatedAction.validateUserId(userId)) {
      throw new EntityError('props.userId')
    }
    this.props.userId = userId
  }

  // JSON Conversion

  static fromJSON(json: AssociatedActionJsonProps): AssociatedAction {
    return new AssociatedAction({
      actionId: json.action_id,
      startDate: json.start_date,
      userId: json.user_id
    })
  }

  toJSON() {
    return {
      action_id: this.actionId,
      start_date: this.startDate,
      user_id: this.userId
    }
  }

  //Validations

  static validateActionId(actionId: string): boolean {
    if (typeof actionId !== 'string') {
      return false
    }
    if (actionId.length !== 36) {
      return false
    }
    return true
  }

  static validateStartDate(startDate: number): boolean {
    if (typeof startDate !== 'number') {
      return false
    }
    return true
  }

  static validateUserId(userId: string): boolean {
    if (typeof userId !== 'string') {
      return false
    }

    return true
  }
}
