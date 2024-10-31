const {Router} = require("express")
const controller = require("../controllers/deleteFilesController")

const router = Router()

router.get("/:fileId", controller.deleteFile, (req, res) => {
    
    res.json({
        message: "Delete 1 file",
        operSuccess: req.operSuccess
    })
})



module.exports = router