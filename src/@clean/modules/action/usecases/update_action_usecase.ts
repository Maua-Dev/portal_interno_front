import { Action } from '../../../shared/domain/entities/action'
import { ACTION_TYPE } from '../../../shared/domain/enums/action_type_enum'
import { STACK } from '../../../shared/domain/enums/stack_enum'
import { EntityError } from '../../../shared/domain/helpers/errors/domain_error'
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
    if (!Action.validateActionId(actionId)) {
      throw new EntityError('actionId')
    }

    if (newOwnerRa && !Action.validateOwnerRa(newOwnerRa)) {
      throw new EntityError('ownerRa')
    }

    if (newStartDate && !Action.validateStartDate(newStartDate)) {
      throw new EntityError('startDate')
    }

    if (newEndDate && newStartDate) {
      if (!Action.validateEndDate(newEndDate, newStartDate))
        throw new EntityError('endDate')
    }

    if (
      newEndDate &&
      newStartDate &&
      newDuration &&
      !Action.validateDuration(newDuration, newStartDate, newEndDate)
    ) {
      throw new EntityError('duration')
    }

    if (newStoryId && !Action.validateStoryId(newStoryId)) {
      throw new EntityError('storyId')
    }

    if (newTitle && !Action.validateTitle(newTitle)) {
      throw new EntityError('title')
    }

    if (newDescription && !Action.validateDescription(newDescription)) {
      throw new EntityError('description')
    }

    if (newProjectCode && !Action.validateProjectCode(newProjectCode)) {
      throw new EntityError('projectCode')
    }

    if (
      newAssociatedMembersRa &&
      !Action.validateAssociatedMembersRa(newAssociatedMembersRa)
    ) {
      throw new EntityError('associatedMembersRa')
    }

    if (newStackTags && !Action.validateStackTags(newStackTags)) {
      throw new EntityError('stackTags')
    }

    if (newActionTypeTag && !Action.validateActionTypeTag(newActionTypeTag)) {
      throw new EntityError('actionTypeTag')
    }

    return this.actionRepo.updateAction(
      actionId,
      newOwnerRa,
      newStartDate,
      newEndDate,
      newDuration,
      newStoryId,
      newTitle,
      newDescription,
      newProjectCode,
      newAssociatedMembersRa,
      newStackTags,
      newActionTypeTag
    )
  }
}
