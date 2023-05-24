import { EntityError } from "../helpers/errors/domain_error";

export type ProjectProps = {
  code: string;
  name: string;
  description: string;
};

export type JsonProps = {
  code: string;
  name: string;
  description: string;
};

export class Project {
  constructor(public props: ProjectProps) {
    if (!Project.validateCode(props.code)) {
      throw new EntityError("props.code");
    }
    this.props.code = props.code;

    if (!Project.validateName(props.name)) {
      throw new EntityError("props.name");
    }
    this.props.name = props.name;

    if (!Project.validateDescription(props.description)) {
      throw new EntityError("props.description");
    }
    this.props.description = props.description;
  }

  // Getters and Setters

  get code() {
    return this.props.code;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  set setCode(code: string) {
    if (!Project.validateCode(code)) {
      throw new EntityError("props.code");
    }
    this.props.code = code;
  }

  set setName(name: string) {
    if (!Project.validateName(name)) {
      throw new EntityError("props.name");
    }
    this.props.name = name;
  }

  set setDescription(description: string) {
    if (!Project.validateDescription(description)) {
      throw new EntityError("props.description");
    }
    this.props.description = description;
  }

  // JSON Conversion

  static fromJSON(json: JsonProps) {
    return new Project({
      code: json.code,
      name: json.name,
      description: json.description,
    });
  }

  toJSON() {
    return {
      code: this.code,
      name: this.name,
      description: this.description,
    };
  }

  // Validations

  static validateCode(code: string): boolean {
    if (code == null) {
      return false;
    } else if (typeof code != "string") {
      return false;
    } else if (code.length != 2) {
      return false;
    } else if (code != code.toUpperCase()) {
      return false;
    } else if (!code.match(/^[A-Za-z]+$/)) {
      return false;
    }
    return true;
  }

  static validateName(name: string): boolean {
    if (name == null) {
      return false;
    } else if (typeof name != "string") {
      return false;
    } else if (name.length < 3) {
      return false;
    }
    return true;
  }

  static validateDescription(description: string): boolean {
    if (description == null) {
      return false;
    } else if (typeof description != "string") {
      return false;
    }
    return true;
  }
}
