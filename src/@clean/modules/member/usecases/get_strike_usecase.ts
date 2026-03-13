import { IMemberRepository } from '../../member/domain/repositories/member_repository_interface'

export class GetStrikeUsecase {
  constructor(private repo: IMemberRepository) {}

  async execute(strikeId: string) {
    return await this.repo.getStrike(strikeId);
  }
}