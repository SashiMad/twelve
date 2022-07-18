import React, { useState } from "react";
import { ReactComponent as PencilIcon } from "./pencil-edit-button-svgrepo-com.svg";

const EditableText = ({ value, handleUpdate }) => {
  const [editValue, setEditValue] = useState(value);
  const [editMode, setEditMode] = useState(false);

  return !editMode ? (
    <>
      {value}
      <button onClick={setEditMode(true)}>
        <PencilIcon />
      </button>
    </>
  ) : (
    <>
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />
      <button
        onClick={() => {
          setEditValue(value);
          setEditMode(false);
        }}
      >
        x
      </button>
      <button onClick={() => handleUpdate(editValue)}>Save</button>
    </>
  );
};

export default EditableText;
