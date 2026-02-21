const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

// ==============================
// ✅ Create Enquiry
// ==============================
router.post("/", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();

    res.json({ message: "Enquiry sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// ✅ Get All Enquiries (Admin)
// ==============================
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("propertyId", "title city");

    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;