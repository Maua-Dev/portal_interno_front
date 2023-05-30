'use client'
import { UserContext } from '@/contexts/user_provider'
import React, { useContext } from 'react'
import styles from './users.module.css'
import LinkComponent from '../components/Link'

export default function UsersPage() {
  const { users, getUser, error, setErrorNull } = useContext(UserContext)

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <div className={styles.page__container}>
      <h1>Get User</h1>
      <form
        onSubmit={handleOnSubmit}
        aria-label="input_get_user_by_id"
        className={styles.form__container}
      >
        <label htmlFor="name" className={styles.id__label}>
          Search ID
        </label>
        <input
          type="number"
          aria-label="get_user_by_id"
          onClick={handleOnClickInput}
          name="id"
          id="id"
          className={styles.id__input}
        />
        <button type="submit" className={styles.button__submit}>
          Search
        </button>
      </form>
      {/* API ERROR */}
      {/* { error && <p className={ styles.error__message } >{`Error: ${error.response?.data}`}</p> } */}
      {error && (
        <p
          id="error_not_found"
          className={styles.error__message}
        >{`${error}`}</p>
      )}
      {users.map((user) => {
        return (
          <div key={user.id} className={styles.container__users}>
            <p className={styles.id__user}>{`User: ${user.id}`}</p>
            <p className={styles.name__user}>{`User: ${user.name}`}</p>
            <p className={styles.email__user}>{`User: ${user.email}`}</p>
            <p className={styles.state__user}>{`User: ${user.state}`}</p>
          </div>
        )
      })}
      <LinkComponent href="create_user">Create User</LinkComponent>
      <LinkComponent href="update_user">Update User</LinkComponent>
      <LinkComponent href="delete_user">Delete User</LinkComponent>
    </div>
  )
}
