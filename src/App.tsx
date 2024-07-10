import ToDoList from "./components/lists";
import AddList from "./components/add-box";
import styled from "styled-components";
import React, { createContext, useState } from "react";

const Heading = styled.h1`
  text-align: center;
`;

export const ListContext = createContext<{
  list: Array<string>;
  setList: React.Dispatch<React.SetStateAction<Array<string>>>;
  newList: string;
  setNewList: React.Dispatch<React.SetStateAction<string>>;
}>({
  list: ["wash", "clean"],
  setList: () => {},
  newList: "",
  setNewList: () => {},
});

function App() {
  const [list, setList] = useState(["wash", "clean"]);
  const [newList, setNewList] = useState<string>("");
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
