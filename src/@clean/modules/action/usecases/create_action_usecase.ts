import { Action } from '../../../shared/domain/entities/action'
import { ACTION_TYPE } from '../../../shared/domain/enums/action_type_enum'
import { STACK } from '../../../shared/domain/enums/stack_enum'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class CreateActionUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(
    startDate: number,
    title: string,
    endDate: number,
    duration: number,
    projectCode: string,
    description?: string,
    storyId?: number,
    associatedMembersUserIds?: string[],
    stackTags?: STACK[],
    actionTypeTag?: ACTION_TYPE
  ): Promise<Action> {
    const actionCreated = await this.actionRepo.createAction(
      startDate,
      title,
      endDate,
      duration,
      projectCode,
      description,
      storyId,
      associatedMembersUserIds,
      stackTags,
      actionTypeTag
    )
    return actionCreated
  }
}
