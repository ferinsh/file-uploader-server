const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

async function deleteFile(req, res, next){
    fileId = parseInt(req.params.fileId)
    // console.log(fileId)
    req.operSuccess = false

    try {
        const rows = await prisma.file.findMany({
            where: {
                id: fileId
            } 
        })
        if(rows.length !== 0){
            await prisma.file.delete({
                where: {
                    id: fileId
                }
            })
            req.operSuccess = true
        }
        // console.log(rows)
        next()
    } catch(err) {
        console.error("Error in deleting file: ", err)
        next()
    }
    
}

module.exports = {
    deleteFile
}