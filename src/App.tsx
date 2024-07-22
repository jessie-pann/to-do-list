import ToDoList from "./components/lists";
import AddList from "./components/add-box";
import styled from "styled-components";
import React, { createContext, useEffect, useState } from "react";

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
  postNewList: (url: string, payload: ListType) => Promise<void>;
}>({
  list: [
    { num: 1, content: "wash" },
    { num: 2, content: "clean" },
  ],
  setList: () => {},
  newList: { num: 0, content: "" },
  setNewList: () => {},
  postNewList: (url: string, payload: ListType) => {
    return Promise.resolve();
  },
});

function App() {
  const [list, setList] = useState<ListType[]>([]);
  const [newList, setNewList] = useState<ListType>({ num: 0, content: "" });

  const fetchData = async (url: string) => {
    const databeforeJson = await fetch(url);
    const dataInJson = await databeforeJson.json();
    console.log(dataInJson);
    setList(dataInJson);
  };

  const postNewList = async (url: string, newListData: ListType) => {
    const databeforeJson = await fetch(url, {
      body: JSON.stringify(newListData),
      method: "POST",
      headers: [["Content-Type", "application/json"]],
    });
    const dataInJson = await databeforeJson.json();
    console.log("post: ", dataInJson);
    setList(dataInJson);
  };

  useEffect(() => {
    fetchData("http://localhost:4000/api/todolist");
  }, []);

  return (
    <>
      <Heading>My TO-DO-LIST</Heading>
      <ListContext.Provider
        value={{ list, setList, newList, setNewList, postNewList }}
      >
        <AddList />
        <ToDoList />
      </ListContext.Provider>
    </>
  );
}

export default App;
