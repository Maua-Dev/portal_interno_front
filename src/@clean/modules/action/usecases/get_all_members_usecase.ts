import { Member } from '../../../shared/domain/entities/member'
import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

interface AllMembersProps {
  members: Member[]
}

export class GetAllMembers {
  constructor(private actionRepo: IActionRepository) {}

  async execute(): Promise<AllMembersProps> {
    const members: Member[] = await this.actionRepo.getAllMembers()

    if (!members || members.length === 0) {
      throw new NoItemsFoundError('No members found')
    }

    return { members }
  }
}
