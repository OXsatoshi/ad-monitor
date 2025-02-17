const contractQueries = require("../db/contractQueries.js");
const domaineName = require("../domaine.js")

exports.createContract = async (req, res) => {
  try {
    const { advertiser_id, start_date, end_date, total_duration } = req.body;

    if (!advertiser_id || !start_date || !end_date || !total_duration) {
      return res.status(400).json({
        success: false,
        message: "All fields (advertiser_id, start_date, end_date, total_duration) are required.",
      });
    }

    const createdContract = await contractQueries.createContract(advertiser_id, start_date, end_date, total_duration);
    if (!createdContract) {
      return res.status(500).json({
        success: false,
        message: "Failed to create the ad contract. Please try again later.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Contract created successfully.",
      data: {
        id: createdContract.id, // Assuming the returned object contains the contract's ID
        advertiser_id: createdContract.advertiser_id,
        start_date: createdContract.start_date,
        end_date: createdContract.end_date,
        total_duration: createdContract.total_duration,
        created_at: createdContract.created_at, // Assuming the database adds a timestamp
        link:`${domaineName.domaineName}/contract/${createdContract.id}`
      },
    });
  } catch (error) {
    console.error("Error creating contract:", error);

    return res.status(500).json({
      success: false,
      message: "An internal server error occurred. Please try again later.",
    });
  }
};
