const {
  declareMatch,
  declareFancy,
  getFancy,
  getMatch,
  declareAbandonedOrTie,
  getDeclareMatches,
  undeclareMatch,
  undeclareFancy,
  declareAbandonedFancy,
} = require("../Controllers/declarationController");
const verify = require("../Middleware/verifyJWT");


const router = require("express").Router();

router.post("/match", declareMatch);
router.post("/fancy", declareFancy);
router.get("/getUndeclareFancy", getFancy);
router.get("/getUndeclareMatch", getMatch);
router.post("/declareAbandonedOrTie", declareAbandonedOrTie);
router.post("/declareAbandonedFancy", declareAbandonedFancy);
router.get("/getdeclareMatches", getDeclareMatches);
router.post("/undeclareMatch", undeclareMatch);
router.get("/undeclareFancy", undeclareFancy);

module.exports = router;