import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import ToDoList from "./lists";
import { ListContext } from "../App";
import userEvent from "@testing-library/user-event";

const mockedList = ["clean", "shopping", "gardening"];

describe("test ToDoList component", () => {
  it("should render the right lists", () => {
    render(
      <ListContext.Provider
        value={{
          list: mockedList,
          setList: () => {},
          newList: "",
          setNewList: () => {},
        }}
      >
        <ToDoList />;
      </ListContext.Provider>
    );

    const listElements = screen.getAllByRole("listitem");
    expect(listElements.length).toBe(3);
  });

  it("delete button", () => {
    render(
      <ListContext.Provider
        value={{
          list: mockedList,
          setList: () => {},
          newList: "",
          setNewList: () => {},
        }}
      >
        <ToDoList />;
      </ListContext.Provider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    fireEvent.click(deleteButtons[0]);
    const listElements = screen.getAllByRole("listitem");
    expect(listElements).not.toContain("clean");
  });

  //   it("the input box and save button for edit should display when clicking the edit button", () => {
  //     render(
  //       <ListContext.Provider
  //         value={{
  //           list: mockedList,
  //           setList: () => {},
  //           newList: "",
  //           setNewList: () => {},
  //         }}
  //       >
  //         <ToDoList />;
  //       </ListContext.Provider>
  //     );
  //     //test they are not there, then click, they display, then edit - save, check the value is correct.

  //     const editButtons = screen.getAllByRole("button", { name: "Edit" });
  //     userEvent.click(editButtons[0]);
  //     const editInputElement = screen.queryAllByTestId("edit-input");
  //     const saveButtonElement = screen.queryAllByRole("button", { name: "Save" });
  //     expect(editInputElement.length).toBe(0);
  //     expect(saveButtonElement).toHaveLength(0);
  //     fireEvent.click(editButtons[0]);
  //     expect(editInputElement).toBeInTheDocument();
  //     expect(saveButtonElement).toBeInTheDocument();
  //   });
});
