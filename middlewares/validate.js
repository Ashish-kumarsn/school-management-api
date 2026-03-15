function validateSchool(req, res, next) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name must be a non-empty string." });
  }

  if (typeof address !== "string" || address.trim() === "") {
    return res.status(400).json({ error: "Address must be a non-empty string." });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || lat < -90 || lat > 90) {
    return res.status(400).json({ error: "Latitude must be a number between -90 and 90." });
  }

  if (isNaN(lon) || lon < -180 || lon > 180) {
    return res.status(400).json({ error: "Longitude must be a number between -180 and 180." });
  }

  next();
}

module.exports = validateSchool;