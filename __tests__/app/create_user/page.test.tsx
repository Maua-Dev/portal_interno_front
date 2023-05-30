import CreateUserPage from "@/app/create_user/page";
import { render, screen } from "@testing-library/react";

describe("Update user page", () => {
    it("Assert page renders and show the right elements", () => {
        render(<CreateUserPage />);

        const labelId = document.querySelector("label[for='id']");
        const labelName = document.querySelector("label[for='name']");
        const labelEmail = document.querySelector("label[for='email']");
        const labelState = document.querySelector("label[for='state']");

        const inputId = screen.getByLabelText("ID");
        const inputName = screen.getByLabelText("Name");
        const inputEmail = screen.getByLabelText("Email");
        const inputState = screen.getByLabelText("State");

        const button = screen.getByText("Create");

        const linkUpdate = screen.getByText("Update User");
        const linkGet = screen.getByText("Get User by Id");
        const linkDelete = screen.getByText("Delete User");

        expect(labelId).toBeInTheDocument();
        expect(labelName).toBeInTheDocument();
        expect(labelEmail).toBeInTheDocument();
        expect(labelState).toBeInTheDocument();

        expect(inputId).toBeInTheDocument();
        expect(inputName).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
        expect(inputState).toBeInTheDocument();

        expect(button).toBeInTheDocument();

        expect(linkUpdate).toBeInTheDocument();
        expect(linkGet).toBeInTheDocument();
        expect(linkDelete).toBeInTheDocument();
    });  
});