
const pool = require("./pool.js");

const createIndustry = async (industryName)=>{
  try{
    const createAdvertiser = await pool.query("INSERT INTO industry(name) values($1)",[industryName]);
  }
  catch(e){
    console.log(e)
  }
}

const getIndustryById = async(id)=>{
  try{
    const industry = await pool.query("SELECT name,id FROM industry WHERE id = $1",[id]); 
    return industry.rows[0];
  }
  catch(e){
    console.error("cannot retrieve industry",e)
  }
}

module.exports = {
getIndustryById
}
