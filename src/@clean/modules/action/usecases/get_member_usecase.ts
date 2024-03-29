import { Member } from '../../../shared/domain/entities/member'
import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class GetMember {
  constructor(private actionRepo: IActionRepository) {}

  async execute(ra: string): Promise<Member> {
    const member = await this.actionRepo.getMember(ra)

    if (!member) {
      throw new NoItemsFoundError('No member found')
    }

    return member
  }
}
