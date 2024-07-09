import ToDoList from "./components/lists";
import AddList from "./components/add-box";
import styled from "styled-components";

const Heading = styled.h1`
  text-align: center;
`;

function App() {
  return (
    <>
      <Heading>My TO-DO-LIST</Heading>
      <AddList />
      <ToDoList />
    </>
  );
}

export default App;
