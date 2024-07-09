import React from "react";
import ToDoList from "./components/lists";
import AddList from "./components/add-box";

function App() {
  return (
    <>
      <h1>My TO-DO-LIST</h1>
      <AddList />
      <ToDoList />
    </>
  );
}

export default App;
