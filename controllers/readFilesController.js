const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

async function getAllFiles(req, res, next) {
    try {
        const allFiles = await prisma.file.findMany();
        req.allFiles = allFiles
        next();
    } catch(err) {
        console.error("Error in getting all files\n", err)
    }
}
async function getFileById(req, res, next) {
    try {
        const rows = await prisma.file.findMany({
            where: {
                id: parseInt(req.params.fileId)
            }
        })
        req.fileResults = rows
        next()
    } catch (err) {
        console.error("Error getting single file: ", err)
    }
}
async function getFileByName(req, res, next) {
    try {
        const rows = await prisma.file.findMany({
            where: {
                originalname: {
                    contains: req.params.fileName
                }
            }
        })
        req.fileResults = rows
        next()
    } catch(err) {
        console.error("Error getting single file: ", err)
        res.status(404)
    }
}

module.exports = {
    getAllFiles,
    getFileById,
    getFileByName
}