const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');






// Get todo List
router.get('/', (req, res) => {
    Todo.findAll()
        .then(todos => {
            res.json(todos)
        })
        .catch(err => console.log('errouuuuu', err))

})

// Add todo

router.post('/add/newtodo', async (req, res) => {


    Todo.create({
        task: req.body.task
    })
    .then(response => res.send(response.dataValues))    
    .catch(err => console.log('erro ao adicionar todo', err))
})

// Delete todo

router.get('/delete/:id', (req, res) => {
    Todo.destroy({
        where: {
            id: req.params.id
        }
    })
    .catch(err => console.log('erro ao deletar', err))
    
})


// Edit todo

router.post('/edit', (req, res) => {
    Todo.update({ task: req.body.task }, {
        where: {
          id: req.body.id
        }
      })
      .catch(err => console.log('erro ao editar', err))
})


module.exports = router;