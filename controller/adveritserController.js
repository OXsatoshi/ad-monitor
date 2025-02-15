
const advertisersQueries = require("../db/advertiserQueries.js");

exports.getAllAdvertisers = async (req, res) => {
  console.log(req.params)
  try {
    const result = await advertisersQueries.getAllAdvertisers();

    if (result && result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Advertisers retrieved successfully",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "No advertisers found",
      });
    }
  } catch (error) {
    console.error("Error fetching advertisers:", error);

    return res.status(500).json({
      success: false,
      error: "An internal server error occurred",
    });
  }
};
exports.getAdvertiserById=async (req,res)=>{
  try {
    const result = await advertisersQueries.getAdvertiserById(req.params.id)  
    if(result){
      return res.status(200).json({
        success:true,
        message:"Advertiser retrieved successfully",
        data:result
      })}
    else {
      return res.status(404).json({
        success:false,
        error:"No advertiser found"
      })
    }

  } catch (error) {
    console.error("Error fetching Advertiser:", error) 
    return res.status(404).json({
      success:false,
      error:"No advertiser found"
    })

  }
}
exports.createAdvertiser = async (req,res)=>{

  const { name, industryId } = req.body;
  if (!name || !industryId) {
    return res.status(400).json({
      success: false,
      message: "Name and Industry ID are required.",
    });
  }
  try {
    const adv =await advertisersQueries.createAdvertiser(name,industryId);
    console.log(adv)
    if(adv){
      return res.status(200).json({
        success:true,
        message:"Advertiser Created successfully",
        data:adv
      })
    }
    else{
      res.status(500).json({
        success:false,
        error:"Cannot create advertiser"
      }) 
    }   
  }
 catch (e) {
  res.status(500).json({
    success:false,
    error:"Cannot create advertiser"
  }) 
}
}

