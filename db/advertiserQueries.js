const pool = require("./pool.js");

const createAdvertiser = async (name, industryId) => {
  const query = `
    INSERT INTO advertisers (name, industry_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [name, industryId]);
    return rows[0];
  } catch (error) {
    console.error("Error creating advertiser:", error.message);
    throw new Error("Failed to create advertiser");
  }
};
const getAdvertiserById = async(id)=>{
  const query = `
select advertisers.name,industry.name from advertisers
left join industry 
on advertisers.industry_id=industry.id
where advertisers.id = $1
`
  try {
    const row = await pool.query(query,[id]) 
    return row.rows[0]
  } catch (error) {
    console.log("error fetching advertisers"+error) 
  }
}
const getAllAdvertisers = async ()=>{
  const query = `
select advertisers.name,industry.name from advertisers
left join industry 
on advertisers.industry_id=industry.id
`
  try {
    const results = await pool.query(query) 
    return results.rows
  } catch (error) {
    console.log("couldnt fetch advertisers"+error) 
  }
}
(async () => {
  const advertiser = await getAllAdvertisers();
  console.dir(advertiser);
})();
module.exports = {
  createAdvertiser,
  getAdvertiserById,
  getAllAdvertisers,
  getAdvertiserById
}
