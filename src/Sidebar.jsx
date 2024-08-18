import React from "react";

const getEmojiForSentiment = (emotion) => {
  switch (emotion) {
    case "Positive":
      return "😊";
    case "Negative":
      return "😢";
    case "Neutral":
      return "😐";
    default:
      return "🤔";
  }
};

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  data,
}) => {
  const sortedNotes = data.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, text, lastModified, emotion }) => (
          <div
            key={id}
            className={`app-sidebar-note ${id === activeNote ? "active" : ""}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>
                {getEmojiForSentiment(emotion)}
                {title}
              </strong>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(id);
                }}
              >
                Delete
              </button>
            </div>
            <p>{text && text.substr(0, 100) + "..."}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
