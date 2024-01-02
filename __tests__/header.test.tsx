import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header no auth", () => {
  beforeEach(() => {
    render(<Header authUser={null} />);
  });

  it("renders the logo", () => {
    const logo = screen.getByText("TALLY MARKET");
    expect(logo).toBeInTheDocument();
  });

  it("renders the login button", () => {
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();
  });

  it("renders the signup button", () => {
    const signupButton = screen.getByText("Sign Up");
    expect(signupButton).toBeInTheDocument();
  });
});
