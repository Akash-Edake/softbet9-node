
const { liveCricketMatches, upcommingCricketMatches,inplayMatchesForAllSports, completedCricketMatches,getMatchDetails } = require("../Controllers/matches");
const verify = require("../Middleware/verifyJWT");
  
  const router = require("express").Router();
  router.get("/getLiveMatches/:sportId", liveCricketMatches);
  router.get("/getInplayMatches", inplayMatchesForAllSports);
  router.get("/getUpcommingMatches/4", upcommingCricketMatches);
  router.get("/getCompletedMatches/4", completedCricketMatches);
  router.get("/getMatchDetails/:matchId", getMatchDetails);
  
  module.exports = router;
  