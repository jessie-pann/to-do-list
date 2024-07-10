import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ListContext } from "../App";

const Listsbox = styled.div`
  text-align: center;
`;

const ToDoList = () => {
  const { list, setList, newList, setNewList } = useContext(ListContext);
  const [edit, setEdit] = useState(false);
  const [editedList, setEditedList] = useState("");

  const deleteList = (value: string) => {
    const listAfterDeleted = list.filter((each) => each !== value);
    setList(listAfterDeleted);
  };

  const editingList = (valueNew: string, valueOld: string) => {
    const listAfterEdited = list.includes(valueNew)
      ? list
      : [...list, valueNew];
    const deleteTheEdited = listAfterEdited.filter(
      (each: string) => each !== valueOld
    );
    setList(deleteTheEdited);
    setEdit(false);
  };

  return (
    <Listsbox>
      <ul>
        {list.map((each: string, i) => {
          const copiedValue = each.toString();
          return (
            <>
              {edit ? (
                <>
                  <input
                    type="text"
                    key={i}
                    value={editedList ? editedList : copiedValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setEditedList(event.target.value)
                    }
                  />
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      editingList(editedList, each);
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <li key={i}>{each}</li>
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
              <button onClick={() => setEdit(true)}>Edit</button>
            </>
          );
        })}
      </ul>
    </Listsbox>
  );
};

export default ToDoList;
