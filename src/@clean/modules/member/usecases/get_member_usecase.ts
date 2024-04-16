import { Member } from '../../../shared/domain/entities/member'
import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { IMemberRepository } from '../../member/domain/repositories/member_repository_interface'

export class GetMemberUsecase {
  constructor(private actionRepo: IMemberRepository) {}

  async execute(): Promise<Member> {
    const member = await this.actionRepo.getMember()

    if (!member) {
      throw new NoItemsFoundError('No member found')
    }

    return member
  }
}
