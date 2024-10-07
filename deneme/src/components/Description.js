import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Description = (props) => {
  const [showTextField, setShowTextField] = useState(false);
  const [description, setDescription] = useState("");
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  const handleNewDescriptionClick = () => {
    setShowTextField(true);
  };

  const handleChange = (event) => {
    let description = event.target.value;
    setDescription(description);
    return description;
  };
  useEffect(() => {
    setDescription("");
  }, [props.isDescription]);

  const handleSaveClick = () => {
    setShowTextField(false);
  };

  const handleClickOutside = (event) => {
    if (
      boxRef.current &&
      !boxRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowTextField(false);
    }
  };

  useEffect(() => {
    if (showTextField) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTextField]);

  return (
    <>
      {!showTextField ? (
        <a
          href="#"
          onClick={handleNewDescriptionClick}
          style={{
            color: "#4F4F4F",
            textDecoration: "none",
            cursor: "pointer",
            fontSize: "11px",
            lineHeight: "0.7",
            padding: "5px",
            textAlign: "left",
            overflowWrap: "break-word",
            wordWrap: "break-word",
          }}
        >
          {description || "New Description"}
        </a>
      ) : (
        <Box
          component="form"
          ref={boxRef}
          sx={{
            "& .MuiTextField-root": {
              backgroundColor: "transparent",
              border: "none",
              width: "55%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            autoFocus
            margin="dense"
            id="description"
            multiline
            rows={7}
            fullWidth
            defaultValue={description || "New description"}
            value={description}
            onChange={(event) => {
              props.onDescriptionChange(handleChange(event));
            }}
            InputProps={{
              inputRef: inputRef,
              style: {
                fontSize: "11px",
                lineHeight: "0.8",
                padding: "5px",
                textAlign: "left",
          
              },
              inputProps: {
                spellCheck: false,
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default Description;






