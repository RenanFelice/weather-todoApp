import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';



function useTodoHooks(initVal) {
    const [todos, setTodos] = useState(initVal)

    const addTodo = (newTodo) => {
        if(!newTodo || newTodo === ' ') return
        
        axios(`/todos/add/${newTodo}`)
        let newTodosArr = todos.map(todo => {
            return {task: todo.task, id:todo.id, last:false}
        })
        setTodos([...newTodosArr, {task:newTodo, id: uuidv4(), last:true}])
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
        axios(`/todos/delete/${id}`)

    }

    const editTodo = (id, newTask) => {
        setTodos(todos.map(todo => {
            if(todo.id === id) {
                return {task: newTask, id}
            } else {
                return todo
            }
        }))
    }

    return [todos, addTodo, deleteTodo, editTodo, setTodos]
}

export default useTodoHooks
