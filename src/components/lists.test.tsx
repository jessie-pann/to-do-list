import React from "react";
import { act } from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToDoList from "./lists";
import { ListContext, ListType } from "../App";

const mockedToDoList = [
  { num: 1, content: "washing" },
  { num: 2, content: "shopping" },
  { num: 3, content: "tidying" },
];

describe("test the input box for editing feature", () => {
  it("the input box should not appear before the edit button is clicked", () => {
    render(
      <ListContext.Provider
        value={{
          list: mockedToDoList,
          setList: () => {},
          newList: { num: 4, content: "something" },
          setNewList: () => {},
          postNewList: (url: string, payload: ListType) => {
            return Promise.resolve();
          },
        }}
      >
        <ToDoList />
      </ListContext.Provider>
    );

    const inputElement = screen.queryAllByTestId("edit-input");
    expect(inputElement.length).toBe(0);
  });

  it("the edit input box should appear after the edit button is clicked", () => {
    render(
      <ListContext.Provider
        value={{
          list: mockedToDoList,
          setList: () => {},
          newList: { num: 4, content: "something" },
          setNewList: () => {},
          postNewList: (url: string, payload: ListType) => {
            return Promise.resolve();
          },
        }}
      >
        <ToDoList />
      </ListContext.Provider>
    );
    const editButtonElement = screen.getAllByRole("button", { name: "Edit" });
    // question: why do I need to wrap userEvent with act
    act(() => {
      userEvent.click(editButtonElement[0]);
    });

    const inputElement = screen.queryAllByTestId("edit-input");

    expect(inputElement.length).toBe(1);
  });

  it("the save button should appear after the edit button is clicked", () => {
    render(
      <ListContext.Provider
        value={{
          list: mockedToDoList,
          setList: () => {},
          newList: { num: 4, content: "something" },
          setNewList: () => {},
          postNewList: (url: string, payload: ListType) => {
            return Promise.resolve();
          },
        }}
      >
        <ToDoList />
      </ListContext.Provider>
    );
    const editButtonElement = screen.getAllByText("Edit");
    act(() => {
      userEvent.click(editButtonElement[0]);
    });
    const saveButtonElement = screen.queryByText("Save");

    act(() => {
      userEvent.click(editButtonElement[0]);
    });
    expect(saveButtonElement).toBeInTheDocument();
  });

  it.only("should update the list item after editing", async () => {
    const setList = jest.fn();

    render(
      <ListContext.Provider
        value={{
          list: mockedToDoList,
          setList: setList,
          newList: { num: 4, content: "something" },
          setNewList: () => {},
          postNewList: (url: string, payload: ListType) => {
            return Promise.resolve();
          },
        }}
      >
        <ToDoList />
      </ListContext.Provider>
    );
    const editButtonElement = screen.getAllByText("Edit");

    await userEvent.click(editButtonElement[0]);

    const saveButtonElement = screen.getByText("Save");
    const inputElement = screen.getByTestId("edit-input");
    //question: why userEvent.type does not work here

    // await userEvent.clear(inputElement);
    // // userEvent.type(inputElement, "");
    // await userEvent.type(inputElement, "updated washing", { delay: 1 });
    // console.log(inputElement);
    // await userEvent.click(saveButtonElement);

    fireEvent.change(inputElement, { target: { value: "updated washing" } });
    fireEvent.click(saveButtonElement);

    expect(setList).toBeCalledWith([
      { num: 1, content: "updated washing" },
      { num: 2, content: "shopping" },
      { num: 3, content: "tidying" },
    ]);
  });

  it("the input box and the save button should disappear after being clicked", () => {
    render(
      <ListContext.Provider
        value={{
          list: mockedToDoList,
          setList: () => {},
          newList: { num: 4, content: "something" },
          setNewList: () => {},
          postNewList: (url: string, payload: ListType) => {
            return Promise.resolve();
          },
        }}
      >
        <ToDoList />
      </ListContext.Provider>
    );

    const editButtonElement = screen.getAllByText("Edit");
    act(() => {
      userEvent.click(editButtonElement[0]);
    });
    const saveButtonElement = screen.getByText("Save");
    const inputElement = screen.getByTestId("edit-input");

    act(() => {
      userEvent.click(saveButtonElement);
    });
    expect(saveButtonElement).not.toBeInTheDocument();
    expect(inputElement).not.toBeInTheDocument();
  });

  it("list should be updated after deleting", () => {
    const setList = jest.fn();
    render(
      <ListContext.Provider
        value={{
          list: mockedToDoList,
          setList,
          newList: { num: 4, content: "something" },
          setNewList: () => {},
          postNewList: (url: string, payload: ListType) => {
            return Promise.resolve();
          },
        }}
      >
        <ToDoList />
      </ListContext.Provider>
    );
    const deleteButtonElement = screen.getAllByText("Delete");
    act(() => {
      userEvent.click(deleteButtonElement[0]);
    });

    expect(setList).toBeCalledWith([
      { num: 1, content: "shopping" },
      { num: 2, content: "tidying" },
    ]);
  });
});
