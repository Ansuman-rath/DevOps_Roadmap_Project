import React, { useEffect, useState } from 'react'

export default function App() {
  const [health, setHealth] = useState(null)
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [counter, setCounter] = useState(null)

  useEffect(() => {
    fetch('/api/health').then(r => r.json()).then(setHealth).catch(() => setHealth({ status: 'error' }))
    fetch('/api/todos').then(r => r.json()).then(setTodos).catch(() => setTodos([]))
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const res = await fetch('/api/todos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
    const item = await res.json()
    setTodos([item, ...todos])
    setText('')
  }

  const delTodo = async (id) => {
    await fetch('/api/todos/' + id, { method: 'DELETE' })
    setTodos(todos.filter(t => t._id !== id))
  }

  const inc = async () => {
    const res = await fetch('/api/counter')
    const data = await res.json()
    setCounter(data.counter)
  }

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 800, margin: '0 auto'}}>
      <h1>Multi‑Service App</h1>
      <p>React + Node + Mongo + Redis + Nginx (proxy & static)</p>

      <section style={{padding: 12, border: '1px solid #ddd', borderRadius: 12, marginBottom: 16}}>
        <h2>Health</h2>
        <pre>{JSON.stringify(health, null, 2)}</pre>
      </section>

      <section style={{padding: 12, border: '1px solid #ddd', borderRadius: 12, marginBottom: 16}}>
        <h2>Todos (Mongo)</h2>
        <form onSubmit={addTodo} style={{display: 'flex', gap: 8}}>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a todo" style={{flex: 1, padding: 8}}/>
          <button>Add</button>
        </form>
        <ul>
          {todos.map(t => (
            <li key={t._id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{t.text}</span>
              <button onClick={() => delTodo(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section style={{padding: 12, border: '1px solid #ddd', borderRadius: 12}}>
        <h2>Counter (Redis)</h2>
        <button onClick={inc}>Increment</button>
        {counter !== null && <p>Counter value: {counter}</p>}
      </section>
    </div>
  )
}