'use client'
import { UserContext } from '@/contexts/user_provider'
import React, { useContext } from 'react'
import styles from '../users/users.module.css'
import stylesDeleteUser from './delete_user.module.css'
import LinkComponent from '../components/Link'

export default function DeleteUser() {
  const { users, deleteUser, getUser, error, setErrorNull } =
    useContext(UserContext)

  function handleGetUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const id = formData.get('id')
    getUser(Number(id))

    if (error) {
      const errorMessage = document.getElementById('error_not_found')
      errorMessage!.style.display = 'none'
    }
  }

  const handleOnClickInput = (event: React.MouseEvent<HTMLInputElement>) => {
    setErrorNull()
    const input = event.currentTarget
    if (input.value !== '') {
      input.value = ''
    }
    const errorMessage = document.getElementById('error_not_found')
    if (errorMessage) {
      errorMessage.style.display = 'none'
    }
  }

  function handleDeleteUser(id: number) {
    deleteUser(id)
    console.log('User deleted', id)

    const spanMessage: HTMLSpanElement = document.querySelector(
      'span'
    ) as HTMLSpanElement
    spanMessage.style.display = 'block'

    setTimeout(() => {
      spanMessage.style.display = 'none'
    }, 3000)
  }

  return (
    <div>
      <h1>Delete User</h1>

      <div className={styles.page__container}>
        <form onSubmit={handleGetUser} className={styles.form__container}>
          <label htmlFor="name" className={styles.id__label}>
            Search ID
          </label>
          <input
            type="number"
            aria-label="delete_user"
            onClick={handleOnClickInput}
            name="id"
            id="id"
            className={styles.id__input}
          />
          <button type="submit" className={styles.button__submit}>
            Search
          </button>
        </form>
        {error && (
          <p
            id="error_not_found"
            className={styles.error__message}
          >{`${error}`}</p>
        )}
        <LinkComponent href="create_user">Create User</LinkComponent>
        <LinkComponent href="update_user">Update User</LinkComponent>
        <LinkComponent href="users">Get User by Id</LinkComponent>
        {users.map((user) => {
          return (
            <div key={user.id} className={styles.container__users}>
              <p className={styles.name__user}>{`User: ${user.name}`}</p>
              <p className={styles.email__user}>{`User: ${user.email}`}</p>
              <p className={styles.state__user}>{`User: ${user.state}`}</p>
              <button
                onClick={() => handleDeleteUser(user.id as number)}
                className={stylesDeleteUser.button__delete}
              >
                Delete
              </button>
            </div>
          )
        })}
        <span style={{ display: 'none', color: 'red' }}>User deleted!!</span>
      </div>
    </div>
  )
}
