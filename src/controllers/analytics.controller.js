const ShortUrl = require("../models/ShortUrl");

const getAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const { shortCode } = req.params;

    const url = await ShortUrl.findOne({
      shortCode,
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    const clicksByDay = {};

    url.clickHistory.forEach(
      (click) => {
        const date =
  click.clickedAt.toLocaleDateString(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
    }
  );

        clicksByDay[date] =
          (clicksByDay[date] || 0) + 1;
      }
    );

    const analytics =
      Object.entries(
        clicksByDay
      ).map(([date, clicks]) => ({
        date,
        clicks,
      }));

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalytics,
};