exports.list = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc' // ถ้ามีฟิลด์ createdAt
            }
        })

        // แน่ใจว่าเป็น array เสมอ
        if (!Array.isArray(todos)) {
            return res.status(200).json([])
        }

        res.status(200).json(todos)

    } catch (error) {
        console.log(error)
        // เมื่อ error ก็ควรส่ง array ว่างกลับไป
        res.status(500).json([])
    }
}

exports.create = async (req, res) => {
    try {
        const { title, status } = req.body
        const newTodo = await prisma.todo.create({
            data: {
                title: title,
                status: status || false // default ถ้าไม่ส่งมา
            }
        })

        res.status(201).json(newTodo) // 201 Created

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Server Error',
            details: error.message
        })
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

        res.status(200).json(updated)

    } catch (error) {
        console.log(error)
        // ถ้าไม่พบ todo
        if (error.code === 'P2025') {
            return res.status(404).json({
                error: 'Todo not found'
            })
        }
        res.status(500).json({
            error: 'Server Error',
            details: error.message
        })
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

        res.status(200).json(deleted)

    } catch (error) {
        console.log(error)
        // ถ้าไม่พบ todo
        if (error.code === 'P2025') {
            return res.status(404).json({
                error: 'Todo not found'
            })
        }
        res.status(500).json({
            error: 'Server Error',
            details: error.message
        })
    }
}