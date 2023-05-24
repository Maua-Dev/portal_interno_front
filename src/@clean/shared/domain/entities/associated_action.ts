import { Action } from "./action";


export type AssociatedActionProps = {
    member_ra: string
    action: Action
}

export type JsonProps = {
    member_ra: string
    action: {
        owner_ra: string;
        start_time: number;
        end_time: number;
        action_id: string;
        title: string;
        project_code: string;
        associated_members_ra: string[];
        stack_tags: string[];
        action_type_tags: string[];
    }
}

