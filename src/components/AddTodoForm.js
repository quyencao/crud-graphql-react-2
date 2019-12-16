import React, { useState } from 'react'

const AddTodoForm = props => {
	const initialFormState = { id: null, text: '', completed: false }
	const [ todo, setTodo ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setTodo({ ...todo, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!todo.text) return

				props.addTodo(todo.text, todo.completed)
				setTodo(initialFormState)
			}}
		>
			<label>Text</label>
			<input type="text" name="text" value={todo.text} onChange={handleInputChange} />
			<button>Add new todo</button>
		</form>
	)
}

export default AddTodoForm