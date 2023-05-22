export enum ACTION_TYPE {
  CODE = "CODE",
  MEETING = "MEETING",
  CODEREVIEW = "CODEREVIEW",
  LEARN = "LEARN",
  PRESENTATION = "PRESENTATION",
  DESIGN = "DESIGN",
  ARCHITECT = "ARCHITECT",
  WORK = "WORK",
}

export function actionTypeToEnum(value: string): ACTION_TYPE {
  switch (value) {
    case "CODE":
      return ACTION_TYPE.CODE;
    case "MEETING":
      return ACTION_TYPE.MEETING;
    case "CODEREVIEW":
      return ACTION_TYPE.CODEREVIEW;
    case "LEARN":
      return ACTION_TYPE.LEARN;
    case "PRESENTATION":
      return ACTION_TYPE.PRESENTATION;
    case "DESIGN":
      return ACTION_TYPE.DESIGN;
    case "ARCHITECT":
      return ACTION_TYPE.ARCHITECT;
    case "WORK":
      return ACTION_TYPE.WORK;
    default:
      throw new Error("Invalid value");
  }
}
