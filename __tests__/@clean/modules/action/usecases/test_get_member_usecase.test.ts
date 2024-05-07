import { test, expect } from 'vitest'
import { Member } from '../../../../../src/@clean/shared/domain/entities/member'
import { MemberRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/member_repository_mock'
import { GetMemberUsecase } from '../../../../../src/@clean/modules/member/usecases/get_member_usecase'

test('Test Get Member Usecase', async () => {
  const repo = new MemberRepositoryMock()
  const getMember = new GetMemberUsecase(repo)

  const member = await getMember.execute()

  expect(member).toBeInstanceOf(Member)
  expect(member.name).toBe('Digao Siqueira')
  expect(member.email).toBe('dsiqueira.devmaua@gmail.com')
  expect(member.ra).toBe('22006800')
  expect(member.role).toBe('DEV')
  expect(member.stack).toBe('FRONTEND')
  expect(member.year).toBe(3)
  expect(member.cellphone).toBe('11999999999')
  expect(member.course).toBe('CIC')
  expect(member.hiredDate).toBe(1612137600000)
  expect(member.active).toBe('ACTIVE')
  expect(member.userId).toBe('f28a92a3-0434-4efd-8f1b-a9c0af6ee627')
  expect(member.emailDev).toBe('dsiqueira.devmaua@gmail.com')
})
