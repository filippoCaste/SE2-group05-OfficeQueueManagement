const router = require("express").Router();
const isLoggedIn = require("../config/configs").isLoggedIn;
const userDao = require("../controllers/dao-services");

router.post("/", isLoggedIn, async (req, res) => {
  try {
    if (!req.hasOwnProperty("user") || req.user.role != "admin")
      return res
        .status(401)
        .json({ error: "user is not admin, cannot get users" });
    const result = await userDao.getUsers();
    res.json(result);
  } catch (err) {
    res.status(500).json(err).end();
  }
});

exports.userRouter = router;
