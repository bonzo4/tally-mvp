import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header authUser={null} />);

    const logo = screen.getByText("TALLY MARKET");
    expect(logo).toBeInTheDocument();
  });
});
