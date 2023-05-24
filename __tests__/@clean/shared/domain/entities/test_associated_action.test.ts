import { Action } from "@/@clean/shared/domain/entities/action";
import { AssociatedAction } from "@/@clean/shared/domain/entities/associated_action";
import { ACTION_TYPE } from "@/@clean/shared/domain/enums/action_type_enum";
import { STACK } from "@/@clean/shared/domain/enums/stack_enum";

// Instance Test

test('Test Associated Action Entity', () => {
    const action = new Action({
        owner_ra: "21.00210-0",
        start_time: 1000,
        end_time: 2000,
        action_id: "4000",
        title: "Test Action Entity",
        project_code: "76",
        associated_members_ra: ["21.00833-7"],
        stack_tags: [STACK.FRONTEND, STACK.BACKEND],
        action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
      });
    const associatedAction = new AssociatedAction({
        member_ra: "20.02194-0",
        action: action,
    })

    expect(associatedAction).toBeInstanceOf(AssociatedAction)
});

// Properties Tests

test('Test Associated Action member_ra', () => {
    const action = new Action({
        owner_ra: "21.00210-0",
        start_time: 1000,
        end_time: 2000,
        action_id: "4000",
        title: "Test Action Entity",
        project_code: "76",
        associated_members_ra: ["21.00833-7"],
        stack_tags: [STACK.FRONTEND, STACK.BACKEND],
        action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
      });
    const associatedAction = new AssociatedAction({
        member_ra: "20.02194-0",
        action: action,
    })

    expect(associatedAction.member_ra).toBe('20.02194-0')
})

test('Test Associated Action action', () => {
    const action = new Action({
        owner_ra: "21.00210-0",
        start_time: 1000,
        end_time: 2000,
        action_id: "4000",
        title: "Test Action Entity",
        project_code: "76",
        associated_members_ra: ["21.00833-7"],
        stack_tags: [STACK.FRONTEND, STACK.BACKEND],
        action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
      });
    const associatedAction = new AssociatedAction({
        member_ra: "20.02194-0",
        action: action,
    })
    
    expect(associatedAction.action).toEqual(
        new Action({
            owner_ra: "21.00210-0",
            start_time: 1000,
            end_time: 2000,
            action_id: "4000",
            title: "Test Action Entity",
            project_code: "76",
            associated_members_ra: ["21.00833-7"],
            stack_tags: [STACK.FRONTEND, STACK.BACKEND],
            action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
      }))
})

