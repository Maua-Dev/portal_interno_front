import { COURSE } from "../../../shared/domain/enums/course_enum";
import { ROLE } from "../../../shared/domain/enums/role_enum";
import { STACK } from "../../../shared/domain/enums/stack_enum";
import { IActionRepository } from "../domain/repositories/action_repository_interface";

export class CreateMemberUsecase {
  constructor(private readonly repo: IActionRepository) { }

  async execute(
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ) {
    const member = await this.repo.createMember(
      ra,
      emailDev,
      role,
      stack,
      year,
      cellphone,
      course
    )

    return member
  }
}
