const {Router} = require("express")
const controller = require("../controllers/readFilesController")

const router = Router();

router.get("/", controller.getAllFiles, (req, res) => {
    res.json({
        message: "get All Files",
        files: req.allFiles
    })
})
router.get("/id/:fileId", controller.getFileById, (req, res) => {
    res.json({
        file: req.fileResults
    })
})
router.get("/name/:fileName", controller.getFileByName, (req, res) => {
    res.json({
        file: req.fileResults
    })
})



module.exports = router