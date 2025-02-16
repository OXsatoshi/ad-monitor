const domaineName = require("../domaine.js")
const advertisersQueries = require("../db/advertiserQueries.js");
const industryQueries = require("../db/industiresQueries.js")
exports.getAllAdvertisers = async (req, res) => {
  try {
    const result = await advertisersQueries.getAllAdvertisers();

    if (result && result.length > 0) {

      const advertisers = []
      for(let i = 0; i<result.length;i++){
        advertisers.push({
          "advertiser":{
            "name":result[i].advertiser_name,
            "id":result[i].advertiser_id,
            "link":`${domaineName.domaineName}/advertiser/${result[i].advertiser_id}`,
            "industry":{
              "name":result[i].industry_name,
              "id":result[i].industry_id,
              "link":`${domaineName.domaineName}/industry/${result[i].idustry_id}`,
            }
          }
        })
      }
      return res.status(200).json({
        success: true,
        message: "Advertisers retrieved successfully",
        data:advertisers, 
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
      const advetisers = []
      for(adversier in result){

      }
      return res.status(200).json({
        success:true,
        message:"Advertiser retrieved successfully",
        advertiser:{
          name:result.advertiser_name,
          id:result.advertiser_id,

          link: `${domaineName.domaineName}/advertiser/${result.advertiser_id}`,
          industry:{
            name:result.industry_name,
            id:result.industry_id,
            link: `${domaineName.domaineName}/industry/${result.industry_id}`
          }
        }
      })
    }
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
    if(adv){
      return res.status(200).json({
        success:true,
        message:"Advertiser Created successfully",
        data:adv
      })
    }
    else
      res.status(500).json({
        success:false,
        error:"Cannot create advertiser"
      }) 
    }   
catch(e) {
    res.status(500).json({
      success:false,
      error:"Cannot create advertiser"
    }) 
  
  }
}

exports.updateAdvertiser = async (req,res)=>{
  const {advertiser_id ,name,industry_id}= req.body.id;
console.log("from update")
  const advertiser = await advertiserQueries.getAdvertiserById(advertiser_id);
  const Correspondedindustry = await industryQueries.getIndustryById(industry_id);
  if(!advertiser || !Correspondedindustry){
    res.status(401).json({
      success:false,
      message:"Cannot update the Advertisr Inconsictent Data"
    })}
  else{
    const updatedAdvertiser = advertisersQueries.updateAdvertiser(name,idustry_id,advertisr_id);  
    if(!updatedAdvertiser){
      return res.status(400).json({
        sucees:false,
        message:"Couldn't update Advertiser"
      })}
    else {
      return res.status(200).json({
        success:true,
        message:"Advertiser updated successfully",
        data:{
          name:result.name,
          id:result.id,
          link:`${domaineName.domaineName}/advertiser/${result.id}`,
          industry:{
            id:Correspondedindustry.id,
            name:Correspondedindustry.name
          }
        }
      })
      }
    
  } 

}

exports.updateAdvertiser = async (req, res) => {
  console.log("from Advertiser")
  try {
    const { advertiser_id, name, industry_id } = req.body;

    // Validate required fields
    if (!advertiser_id || !name || !industry_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: advertiser_id, name, or industry_id",
      });
    }

    // Check if advertiser exists
    const advertiser = await advertisersQueries.getAdvertiserById(advertiser_id);
    if (!advertiser) {
      return res.status(404).json({
        success: false,
        message: "Advertiser not found",
      });
    }

    // Check if industry exists
    const correspondingIndustry = await industryQueries.getIndustryById(industry_id);
    if (!correspondingIndustry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    // Update advertiser
    const updatedAdvertiser = await advertisersQueries.updateAdvertiser(name, industry_id, advertiser_id);
    if (!updatedAdvertiser) {
      return res.status(500).json({
        success: false,
        message: "Failed to update advertiser",
      });
    }

    // Respond with updated data
    return res.status(200).json({
      success: true,
      message: "Advertiser updated successfully",
      data: {
        id: updatedAdvertiser.id,
        name: updatedAdvertiser.name,
        link: `${domaineName.domaineName}/advertiser/${updatedAdvertiser.id}`,
        industry: {
          id: correspondingIndustry.id,
          name: correspondingIndustry.name,
        },
      },
    });
  } catch (error) {
    console.error("Error updating advertiser:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the advertiser",
    });
  }
};
