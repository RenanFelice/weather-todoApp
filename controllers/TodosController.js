const Todo = require('../models/Todo');

module.exports = {
    getTodos: (req, res) => {
        Todo.findAll()
            .then(todos => {
                res.json(todos)
            })
            .catch(err => console.log('erro ao pegar lista de todos', err))

    },

    addTodo: (req, res) => {
        let newTask = req.body.task;
        let errors = [];
        //validação

        if (!newTask) {
            errors.push({ text: 'Por favor, insira um ToDo' })
        }

        if (errors.length > 0) {
            res.send({ err: errors[0].text })
        } else {
            Todo.create({
                task: newTask
            })
                .then(response => res.send(response.dataValues))
                .catch(err => console.log('erro ao adicionar todo', err))
        }

    },

    editTodo: (req, res) => {
        let editedTodo = req.body.task;
        let errors = [];

        if (editedTodo.length > 25) {
            errors.push({ text: 'Todo tem mais de 25 caracteres' })
        }

        if (errors.length > 0) {
            res.send({ err: errors[0].text })
        } else {
            Todo.update({ task: editedTodo }, {
                where: {
                    id: req.body.id
                }
            })
                .then(response => res.send(response.dataValues))
                .catch(err => console.log('erro ao editar todo', err))
        }
    },

    deleteTodo: (req, res) => {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .catch(err => console.log('erro ao deletar todo', err))

    }
}