import { Action } from '../../../shared/domain/entities/action'
import { ACTION_TYPE } from '../../../shared/domain/enums/action_type_enum'
import { STACK } from '../../../shared/domain/enums/stack_enum'
import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class UpdateActionUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(
    actionId: string,
    newOwnerRa?: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number | -1,
    newTitle?: string,
    newDescription?: string | '',
    newProjectCode?: string,
    newAssociatedMembersRa?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE
  ): Promise<Action> {
    const action = await this.actionRepo.getAction(actionId)

    if (!action) {
      throw new NoItemsFoundError('action')
    }

    let members = null

    if (newAssociatedMembersRa && newOwnerRa)
      members = [newOwnerRa, ...newAssociatedMembersRa]
    else if (newAssociatedMembersRa)
      members = [...newAssociatedMembersRa, action.ownerRa]
    else if (newOwnerRa) members = [newOwnerRa, ...action.associatedMembersRa]
    else members = [...action.associatedMembersRa, action.ownerRa]

    if (
      members !== null &&
      new Set(members) !==
        new Set([action.ownerRa, ...action.associatedMembersRa])
    ) {
      this.actionRepo.batchUpdateAssociatedActionMembers(actionId, members)
    }

    const description = newDescription ? newDescription : action.description
    const storyId = newStoryId !== -1 ? newStoryId : action.storyId

    return this.actionRepo.updateAction(
      actionId,
      newOwnerRa,
      newStartDate,
      newEndDate,
      newDuration,
      storyId,
      newTitle,
      description,
      newProjectCode,
      newAssociatedMembersRa,
      newStackTags,
      newActionTypeTag
    )
  }
}
