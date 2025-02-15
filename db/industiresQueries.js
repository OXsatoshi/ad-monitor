
const pool = require("./pool.js");

const createIndustry = async (industryName)=>{
  try{
    const createAdvertiser = await pool.query("INSERT INTO industry(name) values($1)",[industryName]);
  }
  catch(e){
    console.log(e)
  }
}
