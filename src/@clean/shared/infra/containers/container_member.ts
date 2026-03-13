import 'reflect-metadata'
import { Container } from 'inversify'
import { http } from '../http'
import { MemberRepositoryMock } from '../repositories/member_repository_mock'
import { MemberRepositoryHttp } from '../repositories/member_repository_http'
import { CreateMemberUsecase } from '../../../modules/member/usecases/create_member_usecase'
import { DeleteMemberUsecase } from '../../../modules/member/usecases/delete_member_usecase'
import { GetMemberUsecase } from '../../../modules/member/usecases/get_member_usecase'
import { GetAllMembersUsecase } from '../../../modules/member/usecases/get_all_members_usecase'
import { GetAllMembersAdminUsecase } from '../../../modules/member/usecases/get_all_members_admin_usecase'
import { UpdateMemberUsecase } from '../../../modules/member/usecases/update_member_usecase'
import { CreateStrikeUsecase } from '../../../modules/member/usecases/create_strike_usecase' // 👈 1. Importe o usecase
import { GetStrikeUsecase } from '../../../modules/member/usecases/get_strike_usecase'

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
  GetAllMembersUsecase: Symbol.for('GetAllMembersUsecase'),
  GetAllMembersAdimUsecase: Symbol.for('GetAllMembersAdimUsecase'),
  CreateStrikeUsecase: Symbol.for('CreateStrikeUsecase'),
  GetStrikeUsecase: Symbol.for('GetStrikeUseCase')
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
      console.log('Using MemberRepositoryMock (test)')
      return new GetAllMembersUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'prod' ||
      import.meta.env.VITE_STAGE === 'homolog'
    ) {
      console.log('Using MemberRepositoryHttp (dev/prod/homolog)')
      return new GetAllMembersUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    } else {
      console.log('Using MemberRepositoryMock (fallback)')
      return new GetAllMembersUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    }
  })

containerMember
  .bind(RegistryMember.GetAllMembersAdimUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new GetAllMembersAdminUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'prod' ||
      import.meta.env.VITE_STAGE === 'homolog'
    ) {
      return new GetAllMembersAdminUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    } else {
      return new GetAllMembersAdminUsecase(
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
      import.meta.env.VITE_STAGE === 'prod' ||
      import.meta.env.VITE_STAGE === 'homolog'
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
      import.meta.env.VITE_STAGE === 'prod' ||
      import.meta.env.VITE_STAGE === 'homolog'
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
      import.meta.env.VITE_STAGE === 'prod' ||
      import.meta.env.VITE_STAGE === 'homolog'
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
containerMember
  .bind(RegistryMember.CreateStrikeUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new CreateStrikeUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else {
      return new CreateStrikeUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    }
  })
containerMember
  .bind(RegistryMember.GetStrikeUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new GetStrikeUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'prod' ||
      import.meta.env.VITE_STAGE === 'homolog'
    ) {
      return new GetStrikeUsecase(
        context.container.get(RegistryMember.MemberRepositoryHttp)
      )
    } else {
      return new GetStrikeUsecase(
        context.container.get(RegistryMember.MemberRepositoryMock)
      )
    }
  })
