import { EntityError } from "../helpers/errors/domain_error";
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

export class AssociatedAction {
    constructor(public props: AssociatedActionProps) {
        if(!AssociatedAction.validateMemberRa(props.member_ra)) {
            throw new EntityError('props.member_ra')
        } 
        this.props.member_ra = props.member_ra

        if(!(props.action instanceof Action)) {
            throw new EntityError('props.action')
        }
        this.props.action = props.action
    }

    // Getters and Setters

    get member_ra() {
        return this.props.member_ra
    }

    get action() {
        return this.props.action
    }

    set setMemberId(member_ra: string) {
        if(!AssociatedAction.validateMemberRa(member_ra)) {
            throw new EntityError('props.member_ra')
        }
        this.props.member_ra = member_ra
    }

    set setAction(action: Action) {
        if(!(action instanceof Action)) {
            throw new EntityError('props.action')
        }
        this.props.action = action
    }

    //Validations 

    static validateMemberRa(member_ra: string): boolean {
        if (member_ra == null) {
            return false
        } else if (typeof(member_ra) != "string") {
            return false
        } else if(member_ra.length != 8) {
            return false
        } else if (!member_ra.match(/^\d{2}\.\d{5}-\d$/)) {
            return false;
          }
        return true
    }
}