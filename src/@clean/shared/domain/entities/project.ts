

export type ProjectProps = {
    code: string;
    name: string;
    description: string;
}

export type JsonProps = {
    code: string;
    name: string;
    description: string;
}

export class Project {
    constructor (public props: ProjectProps) {

    }

    // Validations

    static validateCode(code: string): boolean {
        if (code == null) {
            return false
        } else if (typeof(code) != "string") {
            return false
        } else if (code.length != 2) {
            return false
        } else if (code == code.toUpperCase()) {
            return false
        } else if (!code.match(/^[A-Za-z]+$/)) {
            return false
        }
        return true
    }

    static validateName(name: string): boolean {
        if (name == null) {
            return false
        } else if (typeof(name) != "string") {
            return false
        } else if (name.length < 3) {
            return false
        }
        return true
    }

    static validateDescription(description: string): boolean {
        if (description == null) {
            return false
        } else if (typeof(description) != "string") {
            return false
        }
        return true
    }
}