const express= require("express")
const routerAdvertiser = express.Router();
const advertiserContoller = require("../controller/adveritserController.js") 

routerAdvertiser.get("/",advertiserContoller.getAllAdvertisers) 
routerAdvertiser.get("/:id",advertiserContoller.getAdvertiserById)
routerAdvertiser.post("/",advertiserContoller.createAdvertiser)
 module.exports =  routerAdvertiser;
