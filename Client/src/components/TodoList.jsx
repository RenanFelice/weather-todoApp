import React, { useState, useRef, useEffect } from 'react'
import styles from './TodoList.module.css'
import Todo from './Todo'
import cx from 'classnames'
import useTodoHooks from '../hooks/todoHooks'
import { Tooltip } from '@material-ui/core'
import axios from 'axios'


function TodoList() {
    const [task, setTask] = useState('')
    const [todos, addTodo, deleteTodo, editTodo, setTodos] = useTodoHooks([])
    const addTodoInput = useRef(null)
    console.log(todos)

    useEffect(() => {
        (async function() {
            setTodos(await axios('/todos').then(todos => todos.data))
        })()
    }, [setTodos])
    


    return (
        <div className={styles.TodoList}>
            <form className={styles.todoForm}
                onSubmit={e => {
                    e.preventDefault()
                    addTodo(task)
                    setTask('')
                    addTodoInput.current.focus()
                }}
            >
                <input className={styles.todoFormInput}
                    value={task}
                    required
                    ref={addTodoInput}
                    placeholder='Insira a tarefa...'
                    maxLength={25}
                    onChange={e => setTask(e.target.value)}
                ></input>
                <div className={styles.addTodo}
                    onClick={e => {
                        addTodo(task)
                        setTask('')
                        addTodoInput.current.focus()
                    }}>
                    <Tooltip placement='top' title="Adicionar">
                        <i className={cx("fas fa-plus", styles.addBtn)}></i>
                    </Tooltip>
                </div>
            </form>
            <ul>
                {todos.length ?
                    todos.map(todo => <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />)
                    :
                    <div className={styles.noTodosContainer}>
                        <h1 className={styles.noTodos}>Sem tarefas</h1>
                        <i className={cx("far fa-smile-beam", styles.smileIcon)}></i>
                    </div>
                }
            </ul>
        </div>
    )
}

export default TodoList