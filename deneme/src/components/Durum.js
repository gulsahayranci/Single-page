import React, { useState } from "react";

const Durum = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const rectStyle = {
    fill: isActive ? "#219653" : "#C4C4C4",
  };


};

export default Durum;
