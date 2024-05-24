import { useContext, useState } from 'react'
import { ActionContext } from '../contexts/action_context'
import { useModal } from './useModal'
import { ActionModalType } from '../components/ActionModal'
import {
  dateToMilliseconds,
  hoursToMilliseconds
} from '../utils/functions/timeStamp'
import Historic from '../components/Historic'
import React from 'react'

export const useAction = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    createAction,
    getHistory,
    updateAction,
    updateActionValidation,
    deleteAction,
    actionError,
    setActionError,
    actionSuccess,
    setActionSuccess
  } = useContext(ActionContext)

  const { closeModal, changeModalContent } = useModal()

  const handleCreateActionSubmit = async (data: ActionModalType) => {
    setIsLoading(true)
    try {
      const createdAction = await createAction(
        dateToMilliseconds(data.startDate),
        data.title,
        dateToMilliseconds(data.endDate),
        hoursToMilliseconds(data.duration),
        data.projectCode,
        data?.description || undefined,
        data?.storyId ? parseInt(data.storyId) : undefined,
        data.associatedMembersUserIds,
        data.stackTags,
        data.actionTypeTag
      )

      if (createdAction) {
        closeModal()
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateActionSubmit = async (data: ActionModalType) => {
    setIsLoading(true)
    try {
      const updatedAction = await updateAction(
        data.actionId!,
        dateToMilliseconds(data.startDate),
        dateToMilliseconds(data.endDate),
        hoursToMilliseconds(data.duration),
        data?.storyId ? parseInt(data.storyId) : undefined,
        data.title,
        data.description,
        data.projectCode,
        data.associatedMembersUserIds,
        data.stackTags,
        data.actionTypeTag
      )
      if (updatedAction) {
        changeModalContent(React.createElement(Historic))
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createAction,
    getHistory,
    updateAction,
    updateActionValidation,
    deleteAction,
    actionError,
    setActionError,
    actionSuccess,
    setActionSuccess,
    isLoading,
    setIsLoading,
    handleCreateActionSubmit,
    handleUpdateActionSubmit
  }
}
