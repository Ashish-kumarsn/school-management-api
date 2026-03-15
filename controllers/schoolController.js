const db = require("../config/db");
const haversine = require("../utils/haversine");

// POST /addSchool
async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
    );

    res.status(201).json({
      message: "School added successfully.",
      schoolId: result.insertId,
    });
  } catch (error) {
    console.error("addSchool error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// GET /listSchools
async function listSchools(req, res) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "latitude and longitude query params are required." });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "latitude and longitude must be valid numbers." });
  }

  try {
    const [schools] = await db.execute("SELECT * FROM schools");

    const sorted = schools
      .map((school) => ({
        ...school,
        distance_km: haversine(userLat, userLon, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    res.status(200).json({
      message: "Schools fetched successfully.",
      userLocation: { latitude: userLat, longitude: userLon },
      total: sorted.length,
      schools: sorted,
    });
  } catch (error) {
    console.error("listSchools error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { addSchool, listSchools };