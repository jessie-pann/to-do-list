import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ListContext } from "../App";
import { ListType } from "../App";

const Addingbox = styled.div`
  text-align: center;
`;

const AddList = () => {
  const { list, setList, newList, setNewList } = useContext(ListContext);

  const addToList = () => {
    const allContents = list.map((each: ListType) => each.content);
    const listAdded = allContents.includes(newList.content)
      ? list
      : [...list, newList];
    console.log(listAdded, list);
    setList(listAdded);
    setNewList({ num: 0, content: "" });
  };

  console.log(newList);

  return (
    <Addingbox>
      <form>
        <label>
          What to do:
          <input
            type="text"
            value={newList.content}
            placeholder="please input your to-do"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewList({ num: list.length + 1, content: event.target.value });
              console.log(newList);
            }}
          />
        </label>
        <button
          onClick={(event) => {
            event.preventDefault();
            addToList();
          }}
        >
          Submit
        </button>
      </form>
    </Addingbox>
  );
};

export default AddList;
