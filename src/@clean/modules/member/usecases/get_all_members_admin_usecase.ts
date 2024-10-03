import { Member } from '../../../shared/domain/entities/member'
import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { IMemberRepository } from '../../member/domain/repositories/member_repository_interface'

interface AllMembersProps {
  members: Member[]
}

export class GetAllMembersAdminUsecase {
  constructor(private actionRepo: IMemberRepository) {}

  async execute(): Promise<AllMembersProps> {
    const members = await this.actionRepo.getAllMembersAdmin()

    if (!members || members.length === 0) {
      throw new NoItemsFoundError('No members found')
    }

    return { members: members }
  }
}
