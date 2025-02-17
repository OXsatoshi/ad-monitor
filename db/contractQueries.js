const pool = require("../db/pool.js");



const createContract = async (advertiser_id,start_date,end_date,total_ad_duration)=>{
  
  const query = `
INSERT INTO ad_contracts(advertiser_id,start_date,end_date,total_ad_duration)
VALUES($1,$2,$3,$4)
RETURNING *
`
    try {
     const result = await pool.query(query,[advertiser_id,start_date,end_date,total_ad_duration]);
    return result.rows[0];
    } catch (error) {
      console.error("Problem creating your Contract",error.msg);
    throw error;
       
    }
}
module.exports = {
  createContract
}
