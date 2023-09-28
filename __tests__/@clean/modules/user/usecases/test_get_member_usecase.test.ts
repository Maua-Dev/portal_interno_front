import '@testing-library/jest-dom'
import { GetMember } from '../../../../../src/@clean/modules/action/usecases/get_member_usecase'
import { Member } from '../../../../../src/@clean/shared/domain/entities/member'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'

test('Test Get Member Usecase', async () => {
  const repo = new ActionRepositoryMock()
  const getMember = new GetMember(repo)

  const member = await getMember.execute('22.00680-0')

  expect(member).toBeInstanceOf(Member)
  expect(member.name).toBe('Digao Siqueira')
  expect(member.email).toBe('dsiqueira.devmaua@gmail.com')
  expect(member.ra).toBe('22.00680-0')
})
