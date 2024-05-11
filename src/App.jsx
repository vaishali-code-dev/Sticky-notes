import { useState } from "react";
import "./App.css";
import Notes from "./components/NoteList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Notes />
    </>
  );
}

export default App;
