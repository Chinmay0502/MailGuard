const Email = require("../models/Email");

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Temporary values.
    // We will replace these with the actual ML service response.
    const prediction = "Spam";
    const probability = 0.95;

    const result = await Email.create({
      email: email.trim(),
      prediction,
      probability,
    });

    return res.status(201).json({
      success: true,
      data: {
        id: result._id,
        email: result.email,
        prediction: result.prediction,
        probability: result.probability,
        createdAt: result.createdAt,
      },
    });
  } catch (error) {
    console.error("Check email error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  checkEmail,
};