const contractController = require("../controller/contractController.js")
const express = require("express")
const contractRouter = express.Router()
contractRouter.post("/",contractController.createContract);


module.exports = contractRouter;
