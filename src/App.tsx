import ToDoList from "./components/lists";
import AddList from "./components/add-box";
import styled from "styled-components";
import React, { createContext, useState } from "react";

const Heading = styled.h1`
  text-align: center;
`;

export interface ListType {
  num: number;
  content: string;
}

export const ListContext = createContext<{
  list: ListType[];
  setList: React.Dispatch<React.SetStateAction<ListType[]>>;
  newList: ListType;
  setNewList: React.Dispatch<React.SetStateAction<ListType>>;
}>({
  list: [
    { num: 1, content: "wash" },
    { num: 2, content: "clean" },
  ],
  setList: () => {},
  newList: { num: 0, content: "" },
  setNewList: () => {},
});

function App() {
  const [list, setList] = useState([
    { num: 1, content: "wash" },
    { num: 2, content: "clean" },
  ]);
  const [newList, setNewList] = useState<ListType>({ num: 0, content: "" });
  return (
    <>
      <Heading>My TO-DO-LIST</Heading>
      <ListContext.Provider value={{ list, setList, newList, setNewList }}>
        <AddList />
        <ToDoList />
      </ListContext.Provider>
    </>
  );
}

export default App;
