import React from "react";
// import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddList from "./add-box";

describe.skip("test adding box", () => {
  it("should display the input box and submit button when the page is rendered", () => {
    render(<AddList />);
    const inputElement = screen.getByPlaceholderText(
      /please input your to-do/i
    );
    const buttonElement = screen.getByRole("button", { name: "Submit" });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("the input box should be cleared after clicking the submit button", () => {
    render(<AddList />);
    const inputElement = screen.getByPlaceholderText(
      /please input your to-do/i
    );
    const buttonElement = screen.getByRole("button", { name: "Submit" });
    fireEvent.change(inputElement, { target: { value: "something" } });
    fireEvent.click(buttonElement);
    expect(inputElement.textContent).not.toBe("something");
  });
});
