
module.exports = async (req, res, next) => {
    //protects login and register if already logged in
  if (req.session.userID) return res.redirect("/");
  next();
};
