import React, { useState } from "react";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Todo(props) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const mouseOver = () => {
    setIsMouseOver(true);
  };

  const mouseOut = () => {
    setIsMouseOver(false);
  };

  return (
    <div
      className="border-bottom p-1 py-2 fs-2 d-flex gap-2"
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <span
        style={
          props.completed
            ? { textDecoration: "line-through" }
            : { texDecoration: "" }
        }
        className="me-auto"
      >
        {props.title}
      </span>

      {isMouseOver && (
        <>
          <button className="btn btn-success" onClick={() => props.mark()}>
            <IconCheck />
          </button>
          <button className="btn btn-secondary" onClick={() => props.moveUp()}>
            <IconArrowUp />
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => props.moveDown()}
          >
            <IconArrowDown />
          </button>
          <button className="btn btn-danger" onClick={() => props.deleteTd()}>
            <IconTrash />
          </button>
        </>
      )}
    </div>
  );
}
