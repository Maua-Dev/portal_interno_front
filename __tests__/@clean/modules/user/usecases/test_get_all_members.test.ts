import '@testing-library/jest-dom'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import { GetAllMembersUsecase } from '../../../../../src/@clean/modules/action/usecases/get_all_members_usecase'
import { Member } from '../../../../../src/@clean/shared/domain/entities/member'

test('Test Get All Members Usecase', async () => {
  const repo = new ActionRepositoryMock()
  const getAllMembers = new GetAllMembersUsecase(repo)

  const { members } = await getAllMembers.execute()

  const emptyMemberArray: Member[] = []
  // eslint-disable-next-line prettier/prettier, no-useless-escape
  const devEmailRegex = RegExp('[A-Za-z]+\.devmaua@gmail\.com')
  // eslint-disable-next-line no-useless-escape, prettier/prettier
  const raRegex = RegExp('[0-9]+\.[0-9]+-0')

  expect(members).not.toBe(emptyMemberArray)
  expect(members.length).toBe(6)

  expect(members[0].name).toBe('Digao Siqueira')
  expect(members[0].email).toBe('dsiqueira.devmaua@gmail.com')
  expect(members[0].ra).toBe('22.00680-0')

  expect(members[1].name).toBe('Bruno fevs')
  expect(members[1].email).toBe('bfevs.devmaua@gmail.com')
  expect(members[1].ra).toBe('22.22222-2')

  expect(members[0].email).toMatch(devEmailRegex)
  expect(members[0].ra).toMatch(raRegex)
})
