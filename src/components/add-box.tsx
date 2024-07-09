import React, { useState } from "react";
import styled from "styled-components";

const Addingbox = styled.div`
  text-align: center;
`;

const AddList = () => {
  //   const [newList, setNewList] = useState("");

  return (
    <Addingbox>
      <form>
        <label>
          What to do:
          <input type="text" />
        </label>
        <button>Submit</button>
      </form>
    </Addingbox>
  );
};

export default AddList;
