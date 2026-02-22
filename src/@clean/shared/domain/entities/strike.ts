import { STRIKE_CATEGORY } from "../enums/strike_category_enum"

export type StrikeCreationResponse = {
  strike_id: string
  owner_user_id: string
  target_user_id: string
  applier_user_id: string
  occurred_date: number
  category: STRIKE_CATEGORY
  description: string
  case_number: number
  message: string
}

export type StrikeProps = {
  strikeId: string
  ownerUserId: string
  targetUserId: string
  applierUserId: string
  occurredDate: number
  category: STRIKE_CATEGORY
  description: string
}

export class Strike {
  constructor(public props: StrikeProps) {}

  get strikeId() {
    return this.props.strikeId
  }
  get targetUserId() {
    return this.props.targetUserId
  }
  get occurredDate() {
    return this.props.occurredDate
  }
  get category() {
    return this.props.category
  }
  get description() {
    return this.props.description
  }

  static fromJSON(json: StrikeCreationResponse): Strike {
    return new Strike({
      strikeId: json.strike_id,
      ownerUserId: json.owner_user_id,
      targetUserId: json.target_user_id,
      applierUserId: json.applier_user_id,
      occurredDate: json.occurred_date,
      category: json.category,
      description: json.description
    })
  }
}
