import { useState } from 'react'
import axios from 'axios';






function useTodoHooks(initVal) {
    const [todos, setTodos] = useState(initVal)


    const addTodo = async (newTodo) => {

        if (!newTodo || newTodo === ' ') return


        await axios({
            method: 'post',
            url: 'todos/add/newtodo',
            headers: { 'Content-Type': 'application/json' },
            data: {
                task: newTodo
            }
        }).then(res => {

            let newTodosArr = todos.map(todo => {
                return { task: todo.task, id: todo.id, last: false }
            })
            setTodos([...newTodosArr, { task: res.data.task, id: res.data.id, last: true }])

        })

    }

    const deleteTodo = async (id) => {

        await axios(`/todos/delete/${id}`).then(
            setTodos(todos.filter(todo => todo.id !== id))
        )

    }

    const editTodo = async (id, newTask) => {

        await axios({
            method: 'post',
            url: '/todos/edit',
            headers: { 'Content-Type': 'application/json' },
            data: {
                task: newTask,
                id
            }
        }).then(
            setTodos(todos.map(todo => {
                if (todo.id === id) {
                    return { task: newTask, id }
                } else {
                    return todo
                }
            }))
        ).catch(err => console.log('erro ao editar', err))
    }

    return [todos, addTodo, deleteTodo, editTodo, setTodos]
}

export default useTodoHooks
