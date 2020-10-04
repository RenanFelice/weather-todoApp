import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';


function useTodoHooks(initVal) {
    const [todos, setTodos] = useState(initVal) 

    const addTodo = (newTodo) => {
        if(!newTodo || newTodo === ' ') return
        // setTodos([...todos, {task:newTodo, id: uuidv4(), last:true} ])
        let newTodosArr = todos.map(todo => {
            return {task: todo.task, id:todo.id, last:false}
        })
        setTodos([...newTodosArr, {task:newTodo, id: uuidv4(), last:true}])
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
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

    return [todos, addTodo, deleteTodo, editTodo]
}

export default useTodoHooks
