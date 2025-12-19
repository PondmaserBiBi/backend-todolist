const prisma = require("../config/prisma")

// GET all todos
exports.list = async (req, res) => {
    try {
        console.log('🔍 Fetching todos...')
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        console.log(`✅ Found ${todos.length} todos`)
        res.status(200).json(todos)

    } catch (error) {
        console.error('❌ Error in list:', error)
        res.status(500).json({
            error: 'Server Error',
            message: error.message
        })
    }
}

// CREATE new todo
exports.create = async (req, res) => {
    try {
        console.log('📝 Creating new todo:', req.body)
        const { title, status } = req.body

        if (!title || title.trim() === '') {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Title is required'
            })
        }

        const newTodo = await prisma.todo.create({
            data: {
                title: title.trim(),
                status: status || false
            }
        })

        console.log('✅ Created todo:', newTodo)
        res.status(201).json(newTodo)

    } catch (error) {
        console.error('❌ Error in create:', error)
        res.status(500).json({
            error: 'Server Error',
            message: error.message
        })
    }
}

// UPDATE todo
exports.update = async (req, res) => {
    try {
        console.log('✏️ Updating todo:', req.params.id, req.body)
        const { id } = req.params
        const { title, status } = req.body

        if (!title || title.trim() === '') {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Title is required'
            })
        }

        const updated = await prisma.todo.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title.trim(),
                status: status
            }
        })

        console.log('✅ Updated todo:', updated)
        res.status(200).json(updated)

    } catch (error) {
        console.error('❌ Error in update:', error)

        if (error.code === 'P2025') {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Todo not found'
            })
        }

        res.status(500).json({
            error: 'Server Error',
            message: error.message
        })
    }
}

// DELETE todo
exports.remove = async (req, res) => {
    try {
        console.log('🗑️ Deleting todo:', req.params.id)
        const { id } = req.params

        const deleted = await prisma.todo.delete({
            where: {
                id: parseInt(id)
            }
        })

        console.log('✅ Deleted todo:', deleted)
        res.status(200).json({
            message: 'Todo deleted successfully',
            todo: deleted
        })

    } catch (error) {
        console.error('❌ Error in delete:', error)

        if (error.code === 'P2025') {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Todo not found'
            })
        }

        res.status(500).json({
            error: 'Server Error',
            message: error.message
        })
    }
}