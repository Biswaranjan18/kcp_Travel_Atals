const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const path = require("path");

// Load service account credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "../service_account.json");

const analyticsDataClient = new BetaAnalyticsDataClient();
const propertyId = "503023021"; // Replace with your GA4 Property ID

// Controller function to get lifetime visitors
exports.getLifetimeVisitors = async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "2000-01-01", endDate: "today" }],
      metrics: [{ name: "totalUsers" }, { name: "sessions" }],
    });

    res.json({
      totalUsers: response.rows[0].metricValues[0].value,
      totalSessions: response.rows[0].metricValues[1].value,
    });
  } catch (error) {
    console.error("Google Analytics API Error:", error);
    res.status(500).json({ error: "Error fetching analytics data" });
  }
};
