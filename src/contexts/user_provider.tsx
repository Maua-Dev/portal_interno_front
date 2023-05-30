'use client'
import { createContext, PropsWithChildren, useState } from 'react'
import { User } from '@/@clean/shared/domain/entities/user'
import {
  container,
  Registry
} from '@/@clean/shared/infra/containers/container_user'
import { GetUserUsecase } from '@/@clean/modules/user/usecases/get_user_usecase'
import { CreateUserUsecase } from '@/@clean/modules/user/usecases/create_user_usecase'
import { UpdateUserUsecase } from '@/@clean/modules/user/usecases/update_user_usecase'
import { DeleteUserUsecase } from '@/@clean/modules/user/usecases/delete_user_usecase'
import { AxiosError } from 'axios'
import { NoItemsFoundError } from '@/@clean/shared/domain/helpers/errors/domain_error'

export type UserContextType = {
  users: User[]
  createUser: (user: User) => void
  getUser: (userId: number) => void
  updateUser: (id: number, newName: string) => void
  deleteUser: (id: number) => void
  error: NoItemsFoundError | null
  setErrorNull: () => void
}

const defaultContext: UserContextType = {
  users: [],
  createUser: (user: User) => {},
  getUser: (userId: number) => {},
  updateUser: (id: number, newName: string) => {},
  deleteUser: (id: number) => {},
  error: null,
  setErrorNull: () => {}
}

export const UserContext = createContext(defaultContext)

const getUserUsecase = container.get<GetUserUsecase>(Registry.GetUsersUsecase)
const createUserUseCase = container.get<CreateUserUsecase>(
  Registry.CreateUserUsecase
)
const updateUserUseCase = container.get<UpdateUserUsecase>(
  Registry.UpdateUserUsecase
)
const deleteUserUseCase = container.get<DeleteUserUsecase>(
  Registry.DeleteUserUsecase
)

export function UserProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<User[]>([])
  // State for error in API
  // const [error, setError] = useState<AxiosError | Error | null>(null);
  const [error, setError] = useState<NoItemsFoundError | null>(null)

  async function createUser(user: User) {
    const userCreated = await createUserUseCase.execute(user)
    setUsers([...users, userCreated])
  }

  async function getUser(userId: number) {
    try {
      const userGetted = await getUserUsecase.execute(userId)
      setUsers([...users, userGetted])
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`)
      const setNotFoundError = new NoItemsFoundError('id')
      setError(setNotFoundError)
    }
  }

  async function updateUser(userId: number, newName: string) {
    const userUpdated = await updateUserUseCase.execute(userId, newName)
    users.filter((user) => user.id !== userId)
    setUsers([...users, userUpdated])
  }

  async function deleteUser(userId: number) {
    await deleteUserUseCase.execute(userId)
    const usersFilteredAfterDelete = users.filter((user) => user.id !== userId)
    setUsers(usersFilteredAfterDelete)
  }

  function setErrorNull() {
    setError(null)
  }

  return (
    <UserContext.Provider
      value={{
        users,
        createUser,
        getUser,
        updateUser,
        deleteUser,
        error,
        setErrorNull
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
