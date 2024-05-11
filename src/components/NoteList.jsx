import React, { useRef, useState, useEffect } from "react";
import Note from "./Note";
const Notes = () => {
  const [titleState, setTitleState] = useState("");
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Default Note 1",
    },
    {
      id: 2,
      title: "Default Note 2",
    },
  ]);

  const allNotesRef = useRef({});

  const handleAddNote = (e) => {
    e.preventDefault();
    setNotes([...notes, { id: notes[notes.length - 1].id + 1, title: titleState }]);
    setTitleState("");
  };

  return (
    <>
      <form className="addNote" onSubmit={handleAddNote}>
        <input placeholder="Enter Title" value={titleState} onChange={(e) => setTitleState(e.target.value)} />
        <button type="submit">Add Note</button>
      </form>
      <div id="notesDiv">
        {notes.map((note) => (
          <Note
            key={note?.id}
            note={note}
            ref={(element) => (allNotesRef.current[note?.id] = element)}
            allNotesRef={allNotesRef}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
