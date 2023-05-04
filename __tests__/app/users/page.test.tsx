import UsersPage from "@/app/users/page";
import { render, screen } from "@testing-library/react";

describe("UsersPage", () => {
    it("Assert page renders and show the right elements", () => {
        render(<UsersPage />);

        const title = screen.getByText("Search ID");
        const input = screen.getByLabelText("get_user_by_id");
        const button = screen.getByText("Search");
        const linkCreate = screen.getByText("Create User");
        const linkUpdate = screen.getByText("Update User");
        const linkDelete = screen.getByText("Delete User");


        expect(title).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(linkCreate).toBeInTheDocument();
        expect(linkUpdate).toBeInTheDocument();
        expect(linkDelete).toBeInTheDocument();
    });  
});