import React, { useState, useEffect } from 'react'

const EditTodoForm = props => {
  const [ todo, setTodo ] = useState(props.currentTodo)

  useEffect(
    () => {
      setTodo(props.currentTodo)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target
    setTodo({ ...todo, [name]: value })
  }

  const handleCheckboxChange = event => {
    setTodo({ ...todo, completed: event.target.checked });
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        if (!todo.text) return

        props.updateTodo(todo.id, { text: todo.text, completed: todo.completed })
        props.setEditing(false)
      }}
    >
      <label>Text</label>
      <input type="text" name="text" value={todo.text} onChange={handleInputChange} />
      <label>Completed <input type="checkbox" name="completed" checked={todo.completed} onChange={handleCheckboxChange} /></label>
      <button>Update todo</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditTodoForm