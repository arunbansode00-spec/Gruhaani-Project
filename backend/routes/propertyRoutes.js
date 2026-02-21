const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Property = require("../models/Property");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");


// =====================================
// ✅ ADD PROPERTY
// =====================================
router.post("/add", auth, upload.single("image"), async (req, res) => {
  try {

    let images = [];

    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "gruhaani" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(req.file.buffer);
        });

      const result = await streamUpload();
      images = [result.secure_url];
    }

    const property = new Property({
      ...req.body,
      images
    });

    await property.save();
    res.status(201).json(property);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


// =====================================
// ✅ GET ALL PROPERTIES
// =====================================
router.get("/", async (req, res) => {
  try {
    const { city, bhk, maxPrice } = req.query;

    let filter = {};

    if (city) filter.city = city;
    if (bhk) filter.bhk = Number(bhk);
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    const properties = await Property.find(filter);
    res.json(properties);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =====================================
// ✅ GET SINGLE PROPERTY
// =====================================
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =====================================
// 🔒 DELETE PROPERTY
// =====================================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =====================================
// 🔒 UPDATE PROPERTY (FIXED IMAGE SUPPORT)
// =====================================
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {

    let updateData = { ...req.body };

    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "gruhaani" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(req.file.buffer);
        });

      const result = await streamUpload();
      updateData.images = [result.secure_url];
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


// =====================================
// 🔒 TOGGLE STATUS
// =====================================
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.status =
      property.status === "available" ? "sold" : "available";

    await property.save();

    res.json(property);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;