const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

async function handleFileUpload (req, res, next) {
    let fileData = {
        userId: 4,         // Foreign key to User
        username: "ferinsharaf",     // Username of the uploader
        filename: "req.file.filename", // Filename from the uploaded file
        originalname: "req.file.originalname",
        path: "req.file.path",
        mimetype: "req.file.mimetype",
        encoding: "req.file.encoding",
        size: 16
    }
    
    try {
        await prisma.file.create({
            data: fileData
        });
        next()
    } catch(err) {
        console.error("Error in creating file: ", err)
    }
}

module.exports = {
    handleFileUpload
}