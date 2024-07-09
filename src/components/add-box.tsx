import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ListContext } from "../App";

const Addingbox = styled.div`
  text-align: center;
`;

const AddList = () => {
  const { list, setList } = useContext(ListContext);
  const [newList, setNewList] = useState<string>("");

  const addToList = () => {
    const listAdded = list.includes(newList) ? list : [...list, newList];
    console.log(listAdded, list);
    setList(listAdded);
    setNewList("");
  };

  return (
    <Addingbox>
      <form>
        <label>
          What to do:
          <input
            type="text"
            value={newList}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewList(event.target.value)
            }
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
