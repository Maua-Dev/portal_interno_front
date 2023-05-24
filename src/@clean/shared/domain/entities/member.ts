import { STACK } from "../enums/stack_enum";

export type MemberProps = {
  name: string;
  email: string;
  ra: string;
  role: string; // ENUM
  stack: STACK; // ENUM
  year: number;
  cellphone: string;
  course: string; // ENUM
  hired_date: number;
  deactivated_date: number;
  active: boolean; // ENUM
  projects: string[]; // Project
};
