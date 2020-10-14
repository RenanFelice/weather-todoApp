const Todo = require('../models/Todo');

module.exports = {
    getTodos: async (req, res) => {
        try {
            await Todo.findAll()
                .then(todos => {
                    res.json(todos)
                })
        } catch (error) {
            console.log('erro ao pegar lista de todos', error)
        }



    },

    addTodo: async (req, res) => {
        let newTask = req.body.task;


        if (!newTask) {
            res.send({ err: 'Por favor, insira um ToDo' })

        } else {
            try {
                Todo.create({
                    task: newTask
                })
                    .then(response => res.send(response.dataValues))
            } catch (error) {
                console.log('erro ao adicionar todo', error)
            }
        }

    },

    editTodo: async (req, res) => {
        let editedTodo = req.body.task;

        if (editedTodo.length > 25) {
            res.send({ err:'Todo tem mais de 25 caracteres' })
        } else {
            try {
                await Todo.update({ task: editedTodo }, {
                    where: {
                        id: req.body.id
                    }
                })
                    .then(response => res.send(response.dataValues))
            } catch (error) {
                console.log('erro ao editar todo', error)
            }

        }
    },

    deleteTodo: async (req, res) => {
        try {
            await Todo.destroy({
                where: {
                    id: req.params.id
                }
            })
        } catch (error) {
            console.log('erro ao deletar todo', error)
        }

    }
}