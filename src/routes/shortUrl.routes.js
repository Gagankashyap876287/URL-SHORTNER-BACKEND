const express = require("express");

const {
  createShortUrl,
  redirectToOriginalUrl,
  getAllUrls,
  updateUrl,
  deleteUrl
} = require("../controllers/shortUrl.controller");

const router = express.Router();

router.post("/shorten", createShortUrl);

router.get("/urls", getAllUrls);

router.get("/:shortCode", redirectToOriginalUrl);

router.put("/urls/:id", updateUrl);

router.delete("/urls/:id", deleteUrl);

module.exports = router;