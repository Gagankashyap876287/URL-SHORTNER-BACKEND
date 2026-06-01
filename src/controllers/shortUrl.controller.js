const {
  createShortUrlService,
  redirectToOriginalUrlService,
  getAllUrlsService,
  updateUrlService,
  deleteUrlService
} = require("../services/shortUrl.service");

const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Original URL is required"
      });
    }

    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL"
      });
    }

    if (
      customAlias &&
      !/^[a-zA-Z0-9_-]+$/.test(customAlias)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Alias can contain only letters, numbers, hyphens and underscores"
      });
    }

    const result = await createShortUrlService(
      originalUrl,
      customAlias
    );

    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const redirectToOriginalUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const originalUrl =
      await redirectToOriginalUrlService(shortCode);

    return res.redirect(originalUrl);
  } catch (error) {
    next(error);
  }
};

const getAllUrls = async (req, res, next) => {
  try {
    const urls = await getAllUrlsService();

    return res.status(200).json({
      success: true,
      data: urls
    });
  } catch (error) {
    next(error);
  }
};

const updateUrl = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const {
      originalUrl,
      customAlias
    } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Original URL is required"
      });
    }

    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL"
      });
    }

    if (
      customAlias &&
      !/^[a-zA-Z0-9_-]+$/.test(customAlias)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Alias can contain only letters, numbers, hyphens and underscores"
      });
    }

    const updatedUrl =
      await updateUrlService(
        id,
        originalUrl,
        customAlias
      );

    return res.status(200).json({
      success: true,
      data: updatedUrl
    });
  } catch (error) {
    next(error);
  }
};

const deleteUrl = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    await deleteUrlService(id);

    return res.status(200).json({
      success: true,
      message:
        "URL deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getAllUrls,
  updateUrl,
  deleteUrl
};
 