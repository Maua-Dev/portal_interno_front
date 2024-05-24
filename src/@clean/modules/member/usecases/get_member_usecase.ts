import { Member } from '../../../shared/domain/entities/member'
import { IMemberRepository } from '../../member/domain/repositories/member_repository_interface'

export class GetMemberUsecase {
  constructor(private actionRepo: IMemberRepository) {}

  async execute(): Promise<Member> {
    return await this.actionRepo.getMember()
  }
}
