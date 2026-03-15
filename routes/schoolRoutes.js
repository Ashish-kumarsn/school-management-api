const express = require("express");
const router = express.Router();
const { addSchool, listSchools } = require("../controllers/schoolController");
const validateSchool = require("../middlewares/validate");

router.post("/addSchool", validateSchool, addSchool);
router.get("/listSchools", listSchools);

module.exports = router;