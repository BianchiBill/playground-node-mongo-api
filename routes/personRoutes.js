//routes api
import app from 'express'
import { Person } from '../models/Person.js'

const router = new app.Router();

router.post('/', async (req, res) => {
    // req.body
    const { name, salary, approved } = req.body

    if (!name || !salary) res.status(422).json({ error: 'Nome e Salario é obrigatório' })

    const person = {
        name, salary, approved
    }

    // create
    try {

        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida com sucesso' })

    } catch (erro) {
        res.status(500).json({ error: erro })
    }

})

//Read
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json({ people })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    //extract data
    const id = req.params.id
    try {
        const person = await Person.findOne({ _id: id })

        if (!person)
            return res.status(500).json({ error: 'Usuario nao existe' })

        return res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})
//update data

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body
    const person = {
        name, salary, approved
    }

    try {
        const updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            return res.status(500).json({ error: 'Usuario nao existe' })
        }

        return res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//delete

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person)
        return res.status(422).json({ error: 'Usuario nao existe' })

    try {
        await Person.deleteOne({ _id: id })
        return res.status(200).json('Deletado com sucesso')

    } catch (error) {
        res.status(500).json({ error: error })
    }
})



export default router