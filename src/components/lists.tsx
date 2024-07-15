import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ListContext } from "../App";
import { ListType } from "../App";

const Listsbox = styled.div`
  text-align: center;
`;

const ToDoList = () => {
  const { list, setList, newList } = useContext(ListContext);
  const [edit, setEdit] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [listSelected, setListSelected] = useState<ListType | null>(null);

  const deleteList = (value: ListType) => {
    const listAfterDeleted = list
      .filter((each) => each.content !== value.content)
      .map((eachList: ListType, i) => ({
        ...eachList,
        num: i + 1,
      }));

    console.log(listAfterDeleted);
    setList(listAfterDeleted);
  };

  const editingList = (newContent: string, listbeingSelected: ListType) => {
    setEdit(false);

    const updatedList = list.map((each: ListType) =>
      each.num === listbeingSelected.num
        ? { ...each, content: newContent }
        : each
    );

    setList(updatedList);

    setListSelected(null);
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
                    value={editedContent ? editedContent : each.content}
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
                <li>
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
