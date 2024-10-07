import React, { useEffect, useState } from "react";

const NewTitle = (props) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleNewTitleClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    let title = e.target.value;
    console.log("title", title);
    setNewTitle(title);
    return title;
  };

  useEffect(() => {
    setNewTitle("");
  }, [props.isTitle]);

  const handleSaveClick = () => {
    
    alert(`New Title: ${newTitle}`);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => {
              props.onTitleChange(handleInputChange(e));
            }}
            placeholder="New Title"
            style={{
              color: "#C56E4F",
              border: "none", 
              outline: "none", 
              boxShadow: "none", 
            }}
          />
        </div>
      ) : (
        <a
          href="#"
          onClick={handleNewTitleClick}
          style={{
            color: "#C56E4F",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          New Title
        </a>
      )}
    </div>
  );
};

export default NewTitle;
