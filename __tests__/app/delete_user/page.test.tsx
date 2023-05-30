import DeleteUser from "@/app/delete_user/page";
import { render, screen } from "@testing-library/react";

describe("UsersPage", () => {
    it("Assert page renders and show the right elements", () => {
        render(<DeleteUser />);

        const title = screen.getByText("Search ID");
        const input = screen.getByLabelText("delete_user");
        const button = screen.getByText("Search");
        const linkCreate = screen.getByText("Create User");
        const linkUpdate = screen.getByText("Update User");
        const linkGet = screen.getByText("Get User by Id");


        expect(title).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(linkCreate).toBeInTheDocument();
        expect(linkUpdate).toBeInTheDocument();
        expect(linkGet).toBeInTheDocument();
    });  
});