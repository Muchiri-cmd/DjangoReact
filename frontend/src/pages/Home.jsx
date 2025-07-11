import React from 'react'
import { useState,useEffect } from 'react'
import api from "../api"
import Note from '../components/Note'

const Home = () => {
  const [notes,setNotes] = useState([])
  const [content,setContent] = useState("")
  const [title,setTitle] = useState("")

  useEffect(() => {
    getNotes()
  },[])

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) =>{ setNotes(data); console.log(data)})
      .catch((error) => alert(error))
  }

  const deleteNote = (id) => {
    api.delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert ("Note deleted successfully")
        else alert("Failed to delete note")
        getNotes()
      }).catch((error) => alert(error))
  }

  const createNote = (e) => {
    e.preventDefault();

    api.post("/api/notes/",{content,title}).then((res) => {
      if(res.status === 201) {
        alert("Note created")
        getNotes()
        setTitle("")
        setContent("")
      }else alert("Failed to make note")
     
    }).catch((error) => alert(error))
    
  }

  return (
    <>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id}/>
        ))}
      </div>
      <div>
        <h2>Create A Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:
            
            <input 
              type="text" 
              id="title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder='title'
            />
          </label>

          <br />

          <label htmlFor="content">Content:
            
            <textarea
              type="textarea" 
              id="content"
              name="content"
              required
              onChange={(e) => setContent(e.target.value)}
              placeholder='content'
            />
          </label>
         
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    </>
    
  )
}

export default Home
