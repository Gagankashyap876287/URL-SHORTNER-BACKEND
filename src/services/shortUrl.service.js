const ShortUrl = require("../models/ShortUrl");
const generateCode = require("../utils/generateCode");

const createShortUrlService = async (originalUrl, customAlias) => {
  let shortCode = customAlias || generateCode();

  const existingCode = await ShortUrl.findOne({ shortCode });

  if (existingCode) {
    throw new Error("Short code already exists");
  }

  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

  const newUrl = await ShortUrl.create({
    originalUrl,
    shortCode,
    shortUrl
  });

  return newUrl;
};

const redirectToOriginalUrlService = async (shortCode) => {
  const urlDoc = await ShortUrl.findOne({ shortCode });

  if (!urlDoc) {
    throw new Error("Short URL not found");
  }

  urlDoc.clicks += 1;

  urlDoc.clickHistory.push({
    clickedAt: new Date()
  });

  await urlDoc.save();

  return urlDoc.originalUrl;
};

const getAllUrlsService = async () => {
  return await ShortUrl.find().sort({ createdAt: -1 });
};

 const updateUrlService = async (
  id,
  originalUrl,
  customAlias
) => {
  const existingAlias =
    await ShortUrl.findOne({
      shortCode: customAlias
    });

  if (
    existingAlias &&
    existingAlias._id.toString() !== id
  ) {
    throw new Error(
      "Alias already exists"
    );
  }

  const updatedUrl =
    await ShortUrl.findByIdAndUpdate(
      id,
      {
        originalUrl,
        shortCode: customAlias,
        shortUrl: `${process.env.BASE_URL}/${customAlias}`
      },
      {
        new: true
      }
    );

  if (!updatedUrl) {
    throw new Error(
      "URL not found"
    );
  }

  return updatedUrl;
};

const deleteUrlService = async (
  id
) => {
  const deletedUrl =
    await ShortUrl.findByIdAndDelete(
      id
    );

  if (!deletedUrl) {
    throw new Error(
      "URL not found"
    );
  }

  return deletedUrl;
};

module.exports = {
  createShortUrlService,
  redirectToOriginalUrlService,
  getAllUrlsService,
  updateUrlService,
  deleteUrlService
};
