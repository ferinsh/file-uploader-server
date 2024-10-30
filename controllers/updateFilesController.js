const {PrismaClient, Prisma} = require("@prisma/client")

const prisma = new PrismaClient()

async function handleFileUpdate(req, res, next){
    try {
        let updatedData = {
            userId: 4,         // Foreign key to User
            username: "ferinsharaf",     // Username of the uploader
            filename: "req.file.fileame", // Filename from the uploaded file
            originalname: "req.file.originalname",
            path: "req.file.path",
            mimetype: "req.file.mimtpe",
            encoding: "req.file.encoding",
            size: 16
        }

        // get OG data
        const rows = await prisma.file.findMany({
            where: {
                userId: updatedData.userId,
                originalname: {
                    contains: updatedData.originalname
                }
            }
        })
        // console.log("rows: ", rows)
        updateFile(updatedData, rows[0])

        


        next()
    } catch(err) {
        console.error("Error in updating file: ", err)
    }
}

async function updateFile(updatedData, row) {
    const changes = compareFiles(updatedData, row)

    if(Object.keys(changes).length === 1){
        console.log("No changes")
    } else {
        await prisma.file.update({
            where: {
                id: changes.id
                // userId: updatedData.userId
            },
            data: {
                ...changes
            }
        })
    }
}


function compareFiles(file1, file2) {
    const differences = {
        id: file2.id || null
    };
  
    // Loop through keys in thfile1e first dictionary
    for (const key in file1) {
        if (file1.hasOwnProperty(key)) {
            // Check if the key exists in the second dictionary
            if (file2.hasOwnProperty(key)) {
                // Compare values
                if (file1[key] !== file2[key]) {
                    differences[key] = file1[key];
                }
            }
        }
    }
    return differences;
}

module.exports = {
    handleFileUpdate
}