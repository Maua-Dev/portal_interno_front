import { User } from '@/@clean/shared/domain/entities/user'
import { STATE } from '@/@clean/shared/domain/enums/state_enum'
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error'

test('Test User entity', () => {
  const user = new User({
    id: 1,
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@gmailcom',
    state: STATE.PENDING,
  })
  expect(user).toBeInstanceOf(User)
})
test('Test User entity name', () => {
  const user = new User({
    id: 1,
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@gmailcom',
    state: STATE.PENDING,
  })
  expect(user.name).toBe('Teste')
})
test('Test User entity email', () => {
  const user = new User({
    id: 1,
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@gmailcom',
    state: STATE.PENDING,
  })
  expect(user.email).toBe('rodrigo.dsiqueira1@gmailcom')
})
test('Test User entity error email', () => {
  expect(() => {
    new User({
      id: 1,
      name: 'Teste',
      email: 'rodrigo.dsiqueira1gmailcom',
      state: STATE.PENDING,
    })
  }).toThrowError(EntityError)
  expect(() => {
    new User({
      id: 1,
      name: 'Teste',
      email: 'rodrigo.dsiqueira1gmailcom',
      state: STATE.PENDING,
    })
  }).toThrowError('Field props.email is not valid')
})
test('Test to json', () => {
  const user = new User({
    id: 1,
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@gmailcom',
    state: STATE.PENDING,
  })

  const userToJSON = user.toJSON()

  expect(userToJSON).toBeInstanceOf(Object)
})

test('Test from json', () => {
  const user = {
    user_id: 1,
    name: 'Teste',
    email: 'rodrigo.dsiqueira1@gmailcom',
    state: 'PENDING',
  }

  const userFromJSON = User.fromJSON(user)

  expect(userFromJSON).toBeInstanceOf(User)
})
