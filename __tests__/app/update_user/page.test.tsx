import UpdateUser from "@/app/update_user/page"
import { render, screen } from "@testing-library/react";

describe("Update user page", () => {
    it("Assert page renders and show the right elements", () => {
        render(<UpdateUser />);

        const title = screen.getByText("Search ID");
        const input = screen.getByLabelText("update_user");
        const button = screen.getByText("Search");
        const linkCreate = screen.getByText("Create User");
        const linkGet = screen.getByText("Get User by Id");
        const linkDelete = screen.getByText("Delete User");


        expect(title).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(linkCreate).toBeInTheDocument();
        expect(linkGet).toBeInTheDocument();
        expect(linkDelete).toBeInTheDocument();
    });  
});