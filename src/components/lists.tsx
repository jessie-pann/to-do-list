import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ListContext } from "../App";

const Listsbox = styled.div`
  text-align: center;
`;

const ToDoList = () => {
  const { list } = useContext(ListContext);

  return (
    <Listsbox>
      {list.map((each: string) => {
        return <p key={each}>{each}</p>;
      })}
    </Listsbox>
  );
};

export default ToDoList;
