'use client';
import React, { useContext, useState } from 'react';

import styles from '../users/users.module.css';
import styles_update_user from './update_user.module.css';
import { UserContext } from '@/contexts/user_provider';
import LinkComponent from '../components/Link';

export default function UpdateUser() {
    const { updateUser, users, getUser, error, setErrorNull } = useContext(UserContext)

    function handleGetUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const id = formData.get('id');
        getUser(Number(id));

        if (error) {
            const errorMessage = document.getElementById('error_not_found');
            errorMessage!.style.display = 'none';

        } 

    }

    const handleOnClickInput = (event: React.MouseEvent<HTMLInputElement>) => {
        setErrorNull()        
        const input = event.currentTarget;
        if (input.value != '') {
            input.value = '';
        }
        const errorMessage = document.getElementById('error_not_found');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }

    function handleUpdateUser(id: number, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const input = document.getElementById('newName') as HTMLInputElement;
        const newName = input.value;
        updateUser(id, newName);

        console.log('User updated: ', id);
    }

    return (
        <div>
            <h1>Update User</h1>

            <div className={ styles.page__container }>
                <form onSubmit={handleGetUser} className={ styles.form__container }>
                    <label htmlFor="name" className={ styles.id__label } >Search ID</label>
                    <input type="number" aria-label='update_user' onClick={handleOnClickInput} name="id" id="id" className={ styles.id__input } />
                    <button type="submit" className={ styles.button__submit } >Search</button>
                </form>
                <LinkComponent href='create_user' >Create User</LinkComponent>
                <LinkComponent href='delete_user' >Delete User</LinkComponent>
                <LinkComponent href='users' >Get User by Id</LinkComponent>                
                { users.map((user) => {
                    return (
                        <>
                            <div key={user.id} className={ styles_update_user.container__users__update}>
                                <p className={ styles.name__user } >{`User: ${user.name}`}</p>
                                <p className={ styles.email__user } >{`User: ${user.email}`}</p>
                                <p className={ styles.state__user } >{`User: ${user.state}`}</p>
                                <form onSubmit={(event) => handleUpdateUser(user.id as number, event)} className={ styles.form__container }>
                                    <label htmlFor="name" className={ styles.id__label } >New Name</label>
                                    <input type="text" name="newName" id="newName" className={ styles.id__input } />
                                    <button type="submit" className={ styles.button__submit } >Update User</button>
                                </form>
                            </div>
                        </>
                    )
                }) }
            </div>
        </div>
    )
}