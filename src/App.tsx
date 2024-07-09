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
}>({ list: ["wash", "clean"], setList: () => {} });

function App() {
  const [list, setList] = useState(["wash", "clean"]);
  return (
    <>
      <Heading>My TO-DO-LIST</Heading>
      <ListContext.Provider value={{ list, setList }}>
        <AddList />
        <ToDoList />
      </ListContext.Provider>
    </>
  );
}

export default App;
