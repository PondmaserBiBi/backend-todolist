const prisma = require("../config/prisma")

exports.create = async (req, res) => {
    try {
        const { title } = req.body

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" })
        }

        const newTodo = await prisma.todo.create({
            data: {
                title: title.trim(),
                status: false // ค่า default กัน error
            }
        })

        res.json(newTodo)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.list = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { id: "desc" }
        })

        // ✅ ส่ง array ตรง ๆ
        res.json(todos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { title, status } = req.body

        const updated = await prisma.todo.update({
            where: { id: Number(id) },
            data: {
                title,
                status
            }
        })

        res.json(updated)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params

        await prisma.todo.delete({
            where: { id: Number(id) }
        })

        res.json({ success: true })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}
