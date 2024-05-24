import { Action } from '../../../shared/domain/entities/action'
import { ACTION_TYPE } from '../../../shared/domain/enums/action_type_enum'
import { STACK } from '../../../shared/domain/enums/stack_enum'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class UpdateActionUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(
    actionId: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number | -1,
    newIsValid?: boolean,
    newTitle?: string,
    newDescription?: string | '',
    newProjectCode?: string,
    newAssociatedMembersUserÌds?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE
  ): Promise<Action> {
    return this.actionRepo.updateAction(
      actionId,
      newStartDate,
      newEndDate,
      newDuration,
      newStoryId,
      newTitle,
      newDescription,
      newProjectCode,
      newAssociatedMembersUserÌds,
      newStackTags,
      newActionTypeTag,
      newIsValid
    )
  }
}
