import { IMemberRepository } from '../domain/repositories/member_repository_interface'

export class DeleteMemberUsecase {
  constructor(private readonly repo: IMemberRepository) {}

  async execute() {
    const member = await this.repo.deleteMember()

    return member
  }
}
