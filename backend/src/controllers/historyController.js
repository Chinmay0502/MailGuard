const Email = require("../models/Email");

const getHistory = async (req, res) => {
  try {
    const emails = await Email.find()
      .sort({ createdAt: -1 })
      .select("email prediction probability createdAt updatedAt");

    return res.status(200).json({
      success: true,
      count: emails.length,
      data: emails,
    });
  } catch (error) {
    console.error("Get history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch email history",
    });
  }
};

module.exports = {
  getHistory,
};