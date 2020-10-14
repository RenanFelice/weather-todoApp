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
            if (res.data.err) {
                alert(res.data.err)
                return
            }
            let newTodosArr = todos.map(todo => {
                return { task: todo.task, id: todo.id, last: false }
            })
            setTodos([...newTodosArr, { task: res.data.task, id: res.data.id, last: true }])

        })

    }

    const editTodo = async (id, newTask, setEditText, oldTask) => {

        await axios({
            method: 'post',
            url: '/todos/edit',
            headers: { 'Content-Type': 'application/json' },
            data: {
                task: newTask,
                id
            }
        }).then(res => {
            if (res.data.err) {
                alert(res.data.err)
                setEditText(oldTask)
                return
            }
            setTodos(todos.map(todo => {
                if (todo.id === id) {
                    return { task: newTask, id }
                } else {
                    return todo
                }
            }))
        }

        ).catch(err => console.log('erro ao editar', err))
    }

    const deleteTodo = async (id) => {
        try {
            await axios(`/todos/delete/${id}`).then(
                setTodos(todos.filter(todo => todo.id !== id))
            )
        } catch (error) {
            console.log(error)
        }
        

    }



    return [todos, addTodo, deleteTodo, editTodo, setTodos]
}

export default useTodoHooks


