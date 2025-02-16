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
SELECT 
    advertisers.name AS advertiser_name, 
    advertisers.id AS advertiser_id, 
    industry.id AS industry_id, 
    industry.name AS industry_name
FROM advertisers
LEFT JOIN industry 
ON advertisers.industry_id = industry.id
WHERE advertisers.id = $1;
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
select
 advertisers.name AS advertiser_name, 
    advertisers.id AS advertiser_id, 
    industry.id AS industry_id, 
    industry.name AS industry_name
FROM advertisers
left join industry 
on advertisers.industry_id=industry.id;
`
  try {
    const results = await pool.query(query) 
    return results.rows
  } catch (error) {
    console.error("couldnt fetch advertisers"+error) 
  }
}

const updateAdvertiser = async (name, industryId, id) => {
  const query = `
    UPDATE advertisers 
    SET name = $1, industry_id = $2, updated_at = NOW()
    WHERE id = $3
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [name, industryId, id]); 
    return result.rows[0]; // Return the updated advertiser
  } catch (e) {
    console.error("Cannot update advertiser:", e.message);
    throw e; 
  }
};

module.exports = {
  createAdvertiser,
  getAdvertiserById,
  getAllAdvertisers,
  getAdvertiserById,
  updateAdvertiser
}
