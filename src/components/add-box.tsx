import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ListContext } from "../App";

const Addingbox = styled.div`
  text-align: center;
`;

const AddList = () => {
  const { list, setList, newList, setNewList } = useContext(ListContext);

  const addToList = () => {
    const listAdded = list.includes(newList) ? list : [...list, newList];
    console.log(listAdded, list);
    setList(listAdded);
    setNewList("");
  };

  console.log(newList);

  return (
    <Addingbox>
      <form>
        <label>
          What to do:
          <input
            type="text"
            value={newList}
            placeholder="please input your to-do"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewList(event.target.value);
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
