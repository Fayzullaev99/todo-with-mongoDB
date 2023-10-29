"use client"
import Image from 'next/image'
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import plus from '../plus.svg'
import Info from '@/components/info'
import Empty from '@/components/empty'
import Todos from '@/components/todos'
import Loader from '@/components/loader'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [edit, setEdit] = useState(null)
  
  useEffect(() => {
    fetch("http://localhost:3000/api/todo")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data)
        setLoading(false)
      })
  }, [])

  async function addNote() {
    if (!newNote) return
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      body: JSON.stringify({ text: newNote }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    setNotes([...notes, data])
    setNewNote('')
  }

  const handleEdit = async (todo) => {
    setEdit(todo)
  }

  const editTodo = async () => {
    if (!edit) return
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      body: JSON.stringify({
        id: edit._id,
        text: edit.text,
        completed: edit.completed
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status == 200) {
      setNotes(notes.map((note) =>
        note._id === edit._id ? { ...note, text: edit.text } : note
      ))
      setEdit(null)
    }
  }

  const deleteTodo = async (id) => {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status == 200) {
      setNotes(notes.filter((note) => note._id != id))
      setEdit(null)
    }
  }

  const checkTodo = async (todo)=>{
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      body: JSON.stringify({id:todo._id,text:todo.text,completed:!todo.completed}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status == 200) {
      setNotes(notes.map((note) => note._id == todo._id ? {...note,completed:!todo.completed} : note))
    }
  }
  
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.main__input}>
          {
            edit
              ? <>
                <input
                  type="text"
                  placeholder='enter your note'
                  value={edit?.text}
                  onChange={(e) => setEdit({ ...edit, text: e.target.value })}
                />
                <button onClick={editTodo}>Edit <Image src={plus} alt="plus" /></button>
              </> : <>
                <input
                  type="text"
                  placeholder='enter your note'
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button onClick={addNote}>Create <Image src={plus} alt="plus" /></button>
              </>
          }
        </div>
        {loading ? <Loader /> : (
          <>
            <Info notes={notes} />
            {notes.length > 0 ? <Todos todos={notes} handle={{handleEdit,deleteTodo,checkTodo}} /> : <Empty />}
          </>
        )}
      </div>
    </main>
  )
}
