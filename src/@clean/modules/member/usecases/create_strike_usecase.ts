import type { IMemberRepository } from '../domain/repositories/member_repository_interface'

export class CreateStrikeUsecase {
  constructor(private readonly memberRepository: IMemberRepository) {}

  async execute(
    memberUserId: string,
    reason: string,
    comment: string,
    date: number
  ) {
    return await this.memberRepository.createStrike(
      memberUserId,
      reason,
      comment,
      date
    )
  }
}
