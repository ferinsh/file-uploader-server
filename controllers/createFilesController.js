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
        
        fileData = await handleDuplicateFile(fileData)
        // console.log("fileData: ", fileData)
        await prisma.file.create({
            data: fileData
        });
        next()
    } catch(err) {
        console.error("Error in creating file: ", err)
    }
}

async function handleDuplicateFile(data) {

    try {
        rows = await prisma.file.findMany({
            where: {
                userId: data.userId,
                originalname: {
                    startsWith: data.originalname
                }
            }
        })
        if(rows.length !== 0){
            // console.log(rows)
            data.originalname = rows.slice(-1)[0].originalname + '_1'
        }
    } catch(err) {
        console.error("Error in appending filename: ", err)
    }
    // console.log(data)
    return data
}

module.exports = {
    handleFileUpload
}