import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ListContext } from "../App";
import { ListType } from "../App";

const Listsbox = styled.div`
  text-align: center;
`;

const ToDoList = () => {
  const { list, setList } = useContext(ListContext);
  const [edit, setEdit] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [listSelected, setListSelected] = useState<ListType | null>(null);

  const deleteList = (value: ListType) => {
    fetch(`http://localhost:4000/api/todolist/${value.num}`, {
      body: JSON.stringify(value),
      method: "DELETE",
      headers: [["Content-Type", "application/json"]],
    });
    const listAfterDeleted = list
      .filter((each) => each.content !== value.content)
      .map((eachList: ListType, i) => ({
        ...eachList,
        num: i + 1,
      }));

    setList(listAfterDeleted);
  };

  const editingList = (newContent: string, listbeingSelected: ListType) => {
    fetch(`http://localhost:4000/api/todolist/${listbeingSelected.num}`, {
      body: JSON.stringify({ num: listbeingSelected.num, content: newContent }),
      method: "PUT",
      headers: [["Content-Type", "application/json"]],
    });

    setEdit(false);

    const updatedList = list.map((each: ListType) =>
      each.num === listbeingSelected.num
        ? { ...each, content: newContent }
        : each
    );

    setList(updatedList);

    setListSelected(null);
    setEditedContent("");
  };

  return (
    <Listsbox>
      <ul style={{ listStyleType: "none" }}>
        {list.map((each: ListType) => {
          return (
            <div key={each.content}>
              {edit && listSelected === each ? (
                <>
                  <input
                    type="text"
                    data-testid="edit-input"
                    placeholder={each.content}
                    value={editedContent}
                    onChange={(event) => setEditedContent(event.target.value)}
                  />
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      editingList(editedContent, listSelected);
                      setEditedContent("");
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <li data-testid="list-element">
                  {each.num} {each.content}
                </li>
              )}

              <button
                onClick={(event) => {
                  event.preventDefault();
                  deleteList(each);
                  setEdit(false);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEdit(true);
                  setListSelected(each);
                  setEditedContent(each.content);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </ul>
    </Listsbox>
  );
};

export default ToDoList;
