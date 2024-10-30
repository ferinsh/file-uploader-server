const {Router} = require("express")
const controller = require("../controllers/createFilesController")

const router = Router();

router.post("/", controller.handleFileUpload,(req, res) => {
    res.json({
        message: "File Saved"
    })
})



module.exports = router