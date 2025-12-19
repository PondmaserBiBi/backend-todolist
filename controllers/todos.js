const prisma = require("../config/prisma")

exports.create = async (req, res) => {

    try {

        const { title, status } = req.body
        const newTodo = await prisma.todo.create({

            data: {

                title: title,
                status: status
            }
        })

        res.json(newTodo)

    } catch (error) {

        console.log(error)

        res.json({ message: 'Server Error' }).status(500)

    }

}

exports.list = async (req, res) => {

    try {

        const todos = await prisma.todo.findMany()

        res.json({ todos })

    } catch (error) {

        console.log(error)

        res.json({ message: 'Server Error' }).status(500)
    }
}

exports.update = async (req, res) => {

    try {

        const { id } = req.params
        const { title, status } = req.body

        const updated = await prisma.todo.update({

            where: {

                id: Number(id)
            },

            data: {
                title: title,
                status: status
            }
        })

        res.json(updated)

    } catch (error) {

        console.log(error)

        res.json({ message: 'Server Error' }).status(500)
    }

}


exports.remove = async (req, res) => {

    try {

        const { id } = req.params

        const deleted = await prisma.todo.delete({

            where: {

                id: Number(id)
            }
        })

        res.send(deleted)

    } catch (error) {

        console.log(error)

        res.json({ message: 'Server Error' }).status(500)
    }

}