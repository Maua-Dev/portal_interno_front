import { test, expect } from 'vitest'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import { GetAllMembersUsecase } from '../../../../../src/@clean/modules/action/usecases/get_all_members_usecase'
import { Member } from '../../../../../src/@clean/shared/domain/entities/member'

test('Test Get All Members Usecase', async () => {
  const repo = new ActionRepositoryMock()
  const getAllMembers = new GetAllMembersUsecase(repo)

  const { members } = await getAllMembers.execute()

  const emptyMemberArray: Member[] = []
  // eslint-disable-next-line prettier/prettier, no-useless-escape
  const devEmailRegex = RegExp('[A-Za-z]+.devmaua@gmail.com')
  // eslint-disable-next-line no-useless-escape, prettier/prettier
  const raRegex = RegExp('[0-9]{8}')

  expect(members).not.toBe(emptyMemberArray)
  expect(members.length).toBe(6)

  expect(members[0].name).toBe('Digao Siqueira')
  expect(members[0].email).toBe('dsiqueira.devmaua@gmail.com')
  expect(members[0].ra).toBe('22006800')
  expect(members[0].role).toBe('DEV')
  expect(members[0].stack).toBe('FRONTEND')
  expect(members[0].year).toBe(3)
  expect(members[0].cellphone).toBe('11999999999')
  expect(members[0].course).toBe('CIC')
  expect(members[0].hiredDate).toBe(1612137600000)
  expect(members[0].active).toBe('ACTIVE')
  expect(members[0].userId).toBe('f28a92a3-0434-4efd-8f1b-a9c0af6ee627')
  expect(members[0].emailDev).toBe('dsiqueira.devmaua@gmail.com')

  expect(members[1].name).toBe('Bruno fevs')
  expect(members[1].email).toBe('bfevs.devmaua@gmail.com')
  expect(members[1].ra).toBe('22222222')
  expect(members[1].role).toBe('DEV')
  expect(members[1].stack).toBe('FRONTEND')
  expect(members[1].year).toBe(3)
  expect(members[1].cellphone).toBe('11999999999')
  expect(members[1].course).toBe('ECM')
  expect(members[1].hiredDate).toBe(1612137600000)
  expect(members[1].active).toBe('ACTIVE')
  expect(members[1].userId).toBe('f28a92a3-0434-4efd-8f1b-a9c0af6ee627')
  expect(members[1].emailDev).toBe('bfevs.devmaua@maua.com')

  expect(members[0].email).toMatch(devEmailRegex)
  expect(members[0].ra).toMatch(raRegex)

  expect(members[1].email).toMatch(devEmailRegex)
  expect(members[1].ra).toMatch(raRegex)
})
