import React, { forwardRef, useEffect, useRef, useState } from "react";

const Note = forwardRef(({ note, allNotesRef }, ref) => {
  //   const noteRef = useRef();
  const [initialPosition, setInitialPosition] = useState([0, 0]);

  const getPosition = () => {
    const getRect = allNotesRef.current[note.id].getBoundingClientRect();
    const width = document.getElementById("notesDiv").offsetWidth - getRect.width;
    const height = document.getElementById("notesDiv").offsetHeight - getRect.height;
    setInitialPosition([Math.random() * width, Math.random() * height]);
  };

  const checkIntersection = () => {
    const getRect = allNotesRef.current[note.id].getBoundingClientRect();
    let notesList = Object.entries(allNotesRef.current).filter((el) => el[0] != note.id);
    return notesList.some((el) => {
      let currRect = el[1].getBoundingClientRect();
      return !(
        currRect.left > getRect.right ||
        currRect.right < getRect.left ||
        currRect.top > getRect.bottom ||
        currRect.bottom < getRect.top
      );
    });
  };

  const handleMouseDown = (e) => {
    const getRect = allNotesRef.current[note.id].getBoundingClientRect();
    const offsetX = e.clientX - getRect.left;
    const offsetY = e.clientY - getRect.top;
    const oldPosition = getRect;
    let header = document.querySelector(".addNote");

    const handleMouseMove = (event) => {
      let currLeft = event.clientX - offsetX;
      let currTop = event.clientY - offsetY - header.offsetHeight;
      if (currLeft >= 0 && currTop >= 0 && currTop + getRect.height <= document.getElementById("notesDiv").offsetHeight) {
        setInitialPosition([currLeft, currTop]);
      }
    };

    const handleMouseUp = () => {
      if (checkIntersection()) {
        setInitialPosition([oldPosition.left, oldPosition.top - header.offsetHeight]);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    getPosition();
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "absolute", left: `${initialPosition[0]}px`, top: `${initialPosition[1]}px` }}
      onMouseDown={handleMouseDown}
      className="noteItem"
    >
      <div>📌</div> <div>{note?.title}</div>
    </div>
  );
});
export default Note;
