'use client'
import { User } from '@/@clean/shared/domain/entities/user'
import { STATE } from '@/@clean/shared/domain/enums/state_enum'
import React, { useContext } from 'react'
import styles from './create_user.module.css'
import { UserContext } from '@/contexts/user_provider'
import LinkComponent from '../components/Link'

export default function CreateUserPage() {
  const { createUser, users } = useContext(UserContext)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const id = formData.get('id')
    const name = formData.get('name')
    const email = formData.get('email')
    const state = formData.get('state')

    const userCreated = new User({
      id: Number(id),
      name: name as string,
      email: email as string,
      state: state as STATE
    })

    createUser(userCreated)
    console.log('User created: ', userCreated)

    const spanMessage: HTMLSpanElement = document.querySelector(
      'span'
    ) as HTMLSpanElement
    spanMessage.style.display = 'block'

    setTimeout(() => {
      spanMessage.style.display = 'none'
    }, 3000)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1>Create User</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="id" className={styles.id__label}>
          ID
        </label>
        <input type="number" name="id" id="id" className={styles.id__input} />
        <label htmlFor="name" className={styles.name__label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className={styles.name__input}
        />
        <label htmlFor="email" className={styles.email__label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={styles.email__input}
        />
        <label htmlFor="state" className={styles.state__label}>
          State
        </label>
        <select
          name="state"
          id="state"
          defaultValue="PENDING"
          className={styles.state__select}
        >
          <option value="APPROVED">APPROVED</option>
          <option value="PENDING">PENDING</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <button type="submit" className={styles.button__submit}>
          Create
        </button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <LinkComponent href="delete_user">Delete User</LinkComponent>
        <LinkComponent href="update_user">Update User</LinkComponent>
        <LinkComponent href="users">Get User by Id</LinkComponent>
      </div>
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
      <span style={{ display: 'none', color: 'green' }}>User created!!</span>
    </div>
  )
}
