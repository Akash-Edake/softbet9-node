const User = require("../Modal/User");
const jwt = require("jsonwebtoken");

const LoginController = async (req, res) => {
  try {
    // Normalize username to lowercase for case-insensitive comparison
    const { usernameOrPhone, password } = req.body;
    let user;

    // Check if input is a phone number or username
    // if (usernameOrPhone.match(/^\d{10}$/)) { // Assuming phone numbers are 10 digits
    //   user = await User.findOne({ phone: usernameOrPhone });
    // } else {
      user = await User.findOne({ username: usernameOrPhone.toLowerCase() });
    // }
    console.log(user);
    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ msg: "Wrong password or username!" });
    }

    // Check if password matches
    const { password: storedPassword, ...info } = user._doc;
    if (storedPassword !== password) {
      return res.status(401).json({ msg: "Wrong password or username!" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Respond with user info and access token
    return res.status(200).json({ ...info, accessToken });

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const PanelLoginController = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).json({ msg: "Wrong password or username!" });
    console.log(user);
    if (user.user_type === 'user') {
        return res.status(401).json({ msg: "Access denied for user type 'user'." });
    }

    const { password, ...info } = user._doc;
    if (password !== req.body.password)
      return res.status(401).json({ msg: "Wrong password or username!" });

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
const companyLogin = async(req,res) =>{
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).json({ msg: "Wrong password or username!" });

    if (user.user_type === 'company') {
      const { password, ...info } = user._doc;
      if (password !== req.body.password)
        return res.status(401).json({ msg: "Wrong password or username!" });
  
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ ...info, accessToken });
    }
    return res.status(401).json({ msg: "Access denied for user type 'user'." });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
const changePasswordController = async (req, res) => {
  let myobj = req.body;
  console.log(myobj);
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.user_id,
      {
        $set: myobj,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ status: 1, msg: "Password updated Successfully." });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { LoginController, changePasswordController,PanelLoginController,companyLogin};
