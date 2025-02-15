const {Pool} = require("pg");


module.exports =new Pool({
  host:"localhost",
  user:"nabil",
  database:"ad_monitor",
  password:"ba062358",
  port:"5432"
}) ;
