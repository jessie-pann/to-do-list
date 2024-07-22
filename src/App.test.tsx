import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe.skip("test App", () => {
  it("should add the new list", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("please input your to-do");
    const buttonElement = screen.getByRole("button", { name: "Submit" });
    act(() => {
      userEvent.type(inputElement, "do something");
      userEvent.click(buttonElement);
    });
    const listElement = screen.getByText("3 do something");
    expect(listElement).toBeInTheDocument();
  });
});
