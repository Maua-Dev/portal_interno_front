import { Action } from "@/@clean/shared/domain/entities/action";
import { ACTION_TYPE } from "@/@clean/shared/domain/enums/action_type_enum";
import { STACK } from "@/@clean/shared/domain/enums/stack_enum";
import { EntityError } from "@/@clean/shared/domain/helpers/errors/domain_error";

test("Test Action Entity", () => {
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
  expect(action).toBeInstanceOf(Action);
});

test("Test Action Entity owner_ra", () => {
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
  expect(action.owner_ra).toBe("21.00210-0");
});

test("Test Action Entity start_time", () => {
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
  expect(action.start_time).toBe(1000);
});

test("Test Action Entity end_time", () => {
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
  expect(action.end_time).toBe(2000);
});

test("Test Action Entity action_id", () => {
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
  expect(action.action_id).toBe("4000");
});

test("Test Action Entity title", () => {
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
  expect(action.title).toBe("Test Action Entity");
});

test("Test Action Entity project_code", () => {
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
  expect(action.project_code).toBe("76");
});

test("Test Action Entity associated_members_ra", () => {
  const action = new Action({
    owner_ra: "21.00210-0",
    start_time: 1000,
    end_time: 2000,
    action_id: "4000",
    title: "Test Action Entity",
    project_code: "76",
    associated_members_ra: ["21.00833-7", "21.00833-8"],
    stack_tags: [STACK.FRONTEND, STACK.BACKEND],
    action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
  });

  expect(action.associated_members_ra).toEqual(["21.00833-7", "21.00833-8"]);
});

test("Test Action Entity stack_tags", () => {
  const action = new Action({
    owner_ra: "21.00210-0",
    start_time: 1000,
    end_time: 2000,
    action_id: "4000",
    title: "Test Action Entity",
    project_code: "76",
    associated_members_ra: ["21.00833-7", "21.00833-8"],
    stack_tags: [STACK.FRONTEND, STACK.BACKEND],
    action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
  });

  expect(action.stack_tags).toEqual([STACK.FRONTEND, STACK.BACKEND]);
});

test("Test Action Entity action_type_tags", () => {
  const action = new Action({
    owner_ra: "21.00210-0",
    start_time: 1000,
    end_time: 2000,
    action_id: "4000",
    title: "Test Action Entity",
    project_code: "76",
    associated_members_ra: ["21.00833-7", "21.00833-8"],
    stack_tags: [STACK.FRONTEND, STACK.BACKEND],
    action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
  });

  expect(action.action_type_tags).toEqual([
    ACTION_TYPE.CODE,
    ACTION_TYPE.LEARN,
  ]);
});

test("Test Action Entity to JSON", () => {
  const action = new Action({
    owner_ra: "21.00210-0",
    start_time: 1000,
    end_time: 2000,
    action_id: "4000",
    title: "Test Action Entity",
    project_code: "76",
    associated_members_ra: ["21.00833-7", "21.00833-8"],
    stack_tags: [STACK.FRONTEND, STACK.BACKEND],
    action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
  });

  expect(action.toJSON()).toEqual({
    owner_ra: "21.00210-0",
    start_time: 1000,
    end_time: 2000,
    action_id: "4000",
    title: "Test Action Entity",
    project_code: "76",
    associated_members_ra: ["21.00833-7", "21.00833-8"],
    stack_tags: [STACK.FRONTEND, STACK.BACKEND],
    action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
  });

  expect(action.toJSON()).toBeInstanceOf(Object);
});

test("Test Action Entity from JSON", () => {
  const action = {
    owner_ra: "21.00210-0",
    start_time: 1000,
    end_time: 2000,
    action_id: "4000",
    title: "Test Action Entity",
    project_code: "76",
    associated_members_ra: ["21.00833-7", "21.00833-8"],
    stack_tags: ["FRONTEND", "BACKEND"],
    action_type_tags: ["CODE", "LEARN"],
  };

  const actionFromJSON = Action.fromJSON(action);

  // expect(actionFromJSON).toEqual({
  //   owner_ra: "21.00210-0",
  //   start_time: 1000,
  //   end_time: 2000,
  //   action_id: "4000",
  //   title: "Test Action Entity",
  //   project_code: "76",
  //   associated_members_ra: ["21.00833-7", "21.00833-8"],
  //   stack_tags: [STACK.FRONTEND, STACK.BACKEND],
  //   action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
  // });

  expect(actionFromJSON).toBeInstanceOf(Action);
});

test("Test Action Entity with invalid owner_ra", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210.0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210.0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError("Field props.owner_ra is not valid");
});

test("Test Action Entity with invalid title", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "xxx",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "xxx",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError("Field props.title is not valid");
});

test("Test Action Entity with invalid project_code", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "762",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "762",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError("Field props.project_code is not valid");
});

test("Test Action Entity with invalid action_id", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "111",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "111",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError("Field props.action_id is not valid");
});

test("Test Action Entity with empty associated_members_ra", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: [],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: [],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError("Field props.associated_members_ra is not valid");
});

test("Test Action Entity with invalid associated_members_ra", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["kkk", "21.00210.0"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["kkk", "21.00210.0"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError("Field props.associated_members_ra is not valid");
});

test("Test Action Entity with invalid number associated_members_ra", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21002100"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21002100"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError("Field props.associated_members_ra is not valid");
});

test("Test Action Entity with invalid stack_tags", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [],
      action_type_tags: [ACTION_TYPE.CODE, ACTION_TYPE.LEARN],
    });
  }).toThrowError("Field props.stack_tags is not valid");
});

test("Test Action Entity with invalid action_type_tags", () => {
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [],
    });
  }).toThrowError(EntityError);
  expect(() => {
    new Action({
      owner_ra: "21.00210-0",
      start_time: 1000,
      end_time: 2000,
      title: "Test Action Entity",
      project_code: "76",
      action_id: "4000",
      associated_members_ra: ["21.00833-7"],
      stack_tags: [STACK.FRONTEND, STACK.BACKEND],
      action_type_tags: [],
    });
  }).toThrowError("Field props.action_type_tags is not valid");
});
