import React from 'react'
import "../styles/Note.css"

const Note = ({note,onDelete}) => {
  return (
    <div className='note-container'>
      <p className='note-title'>{note.title}</p>
      <p className='note-content'>{note.content}</p>
      <p className='note-date'>{new Date(note.created_at).toLocaleDateString()}</p>
      <button className='delete-button' onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  )
}

export default Note
