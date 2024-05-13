import { AssociatedAction } from '../../../../shared/domain/entities/associated_action'
import { Action } from '../../../../shared/domain/entities/action'
import { historyResponse } from '../../../../shared/infra/repositories/action_repository_http'
import { ACTION_TYPE } from '../../../../shared/domain/enums/action_type_enum'
import { STACK } from '../../../../shared/domain/enums/stack_enum'

export interface IActionRepository {
  // creates action and associatedActions for each associatedMember and the owner
  createAction(
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
  ): Promise<Action>
  getAction(actionId: string): Promise<Action>
  // Retrieves all associated actions of a member, filtered by an optional time range specified by start and end parameters.
  // The method allows for pagination using the exclusive_start_key parameter to determine the starting point of the action list, and the amount parameter to determine the maximum number of actions to be retrieved.
  // If no actions are found, returns []
  getHistoryActions(
    start?: number, // milissegundos da data do inicio das actions
    end?: number, // milissegundos da data de fim da action (vai até essa data contando ela mesma)
    amount?: number, // quantidade de actions retornadas
    exclusiveStartKey?: {
      actionId: string
      startDate: number
    }
  ): Promise<historyResponse>

  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction>

  updateAction(
    actionId: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number,
    newTitle?: string,
    newDescription?: string | '',
    newProjectCode?: string,
    newAssociatedMembersUserIds?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE,
    newisValid?: boolean
  ): Promise<Action>

  updateActionValidation(actionId: string, isValid: boolean): Promise<Action>

  deleteAction(actionId: string): Promise<void>
}
