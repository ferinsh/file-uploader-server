const {Router} = require("express")
const controller = require("../controllers/updateFilesController")

const router = Router()

router.post("/", controller.handleFileUpdate, (req, res) => {
    res.json({
        message: "Update Successfull"
    })
})

module.exports = router