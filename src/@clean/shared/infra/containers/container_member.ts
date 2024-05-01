import 'reflect-metadata'
import { Container } from 'inversify'
import { http } from '../http'
import { MemberRepositoryMock } from '../repositories/member_repository_mock'
import { MemberRepositoryHttp } from '../repositories/member_repository_http'
import { CreateMemberUsecase } from '../../../modules/member/usecases/create_member_usecase'
import { DeleteMemberUsecase } from '../../../modules/member/usecases/delete_member_usecase'
import { GetMemberUsecase } from '../../../modules/member/usecases/get_member_usecase'
import { GetAllMembersUsecase } from '../../../modules/member/usecases/get_all_members_usecase'
import { UpdateMemberUsecase } from '../../../modules/member/usecases/update_member_usecase'

export const RegistryMember = {
  // Axios Adapter
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  // Repositories
  MemberRepositoryMock: Symbol.for('MemberRepositoryMock'),
  MemberRepositoryHttp: Symbol.for('MemberRepositoryHttp'),

  // Usecases
  CreateMemberUsecase: Symbol.for('CreateMemberUsecase'),
  DeleteMemberUsecase: Symbol.for('DeleteMemberUsecase'),
  GetMemberUsecase: Symbol.for('GetMemberUsecase'),
  UpdateMemberUsecase: Symbol.for('UpdateMemberUsecase'),
  GetAllMembersUsecase: Symbol.for('GetAllMembersUsecase')
}

export const containerMember = new Container()

// HTTP
containerMember.bind(RegistryMember.AxiosAdapter).toConstantValue(http)

// Repositories
containerMember
  .bind(RegistryMember.MemberRepositoryMock)
  .to(MemberRepositoryMock)
containerMember
  .bind(RegistryMember.MemberRepositoryHttp)
  .toDynamicValue((context) => {
    return new MemberRepositoryHttp(
      context.container.get(RegistryMember.AxiosAdapter)
    )
  })

// Usecases
containerMember
  .bind(RegistryMember.CreateMemberUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new CreateMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'homolog' ||
      import.meta.env.VITE_STAGE === 'prod'
    ) {
      return new CreateMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    } else {
      return new CreateMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    }
  })

containerMember
  .bind(RegistryMember.GetAllMembersUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new GetAllMembersUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'prod'
    ) {
      return new GetAllMembersUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    } else {
      return new GetAllMembersUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    }
  })

containerMember
  .bind(RegistryMember.GetMemberUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new GetMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'prod'
    ) {
      return new GetMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    } else {
      return new GetMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    }
  })

containerMember
  .bind(RegistryMember.UpdateMemberUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new UpdateMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'prod'
    ) {
      return new UpdateMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    } else {
      return new UpdateMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    }
  })

containerMember
  .bind(RegistryMember.DeleteMemberUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new DeleteMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'prod'
    ) {
      return new DeleteMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    } else {
      return new DeleteMemberUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    }
  })
