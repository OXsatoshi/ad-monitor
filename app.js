const express = require("express");
const routerAdvertiser = require("./route/advertisersRouter.js")
const app = express();
app.use(express.json());
app.use("/",routerAdvertiser)
app.listen(3000, console.log("server running ..."));
