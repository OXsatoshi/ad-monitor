const express = require("express");
const routerAdvertiser = require("./route/advertisersRouter.js")
const contractRouter = require("./route/contractRouter.js")
const app = express();
app.use(express.json());
app.use("/advertiser",routerAdvertiser);
console.log(typeof contractRouter)
app.use("/contract",contractRouter);
app.listen(3000, console.log("server running ..."));
