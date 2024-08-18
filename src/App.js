import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [sentimentData, setSentimentData] = useState([]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const notesData = notes.map((note) => ({
          id: note.id,
          title: note.title,
          text: note.body,
          timestamp: new Date(note.lastModified).toISOString(),
        }));

        const response = await fetch("/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ entries: notesData }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setSentimentData(
            result.map((entry) => ({
              ...entry,
              timestamp: new Date(entry.timestamp),
            }))
          );
        } else {
          console.error("Failed to fetch sentiment data");
        }
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    };

    fetchSentimentData();
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
      emotion: "Unknown",
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        data={sentimentData}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        data={sentimentData}
      />
    </div>
  );
}

export default App;
